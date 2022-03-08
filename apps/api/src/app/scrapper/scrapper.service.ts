import { CreateScrapperDto } from '@bwl-opentools/models/scrapper/create-scrapper.dto';
import {
  Scrapper,
  ScrapperDetail,
  ScrapperImage,
  ScrapperLink,
} from '@bwl-opentools/models/scrapper/scrapper';
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  create(createScrapperDto: CreateScrapperDto) {
    return this.scrapper(createScrapperDto.url);
  }

  private async scrapper(url: string) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    const response = await page.goto(url, { waitUntil: 'networkidle2' });

    if (response.status() !== 200) {
      return {
        error: response.status(),
        message: response.statusText(),
      };
    }

    const title = await page.title();

    page.on('console', (msg) => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });

    const result = await page.evaluate(() => {
      function querySelectorAll(selector: string, trim = true) {
        const items: ScrapperDetail[] = [];
        document
          .querySelectorAll(selector)
          .forEach((item: HTMLElement | HTMLMetaElement) => {
            const content = item.textContent;

            items.push({
              id: item.id,
              class: item.className,
              text: trim ? content.trim() : content,
            });
          });
        return items;
      }

      function querySelector(selector: string) {
        const meta = document.querySelector(selector) as HTMLMetaElement;
        return meta?.content.trim() ?? '';
      }

      function queryTable() {
        const results = [];
        const tables = document.querySelectorAll('table');
        tables.forEach((table) => {
          const tr = [];
          const th = [];
          const head = table.querySelector('thead');
          if (head) {
            const thead = head.querySelectorAll('th');
            thead.forEach((h) => {
              th.push({ th: h.textContent.trim() });
            });
          }
          const body = table.querySelector('tbody');
          const rows = body
            ? body.querySelectorAll('tr')
            : table.querySelectorAll('tr');
          rows.forEach((row) => {
            const columns = row.querySelectorAll('td');
            const td = [];
            columns.forEach((column) => {
              td.push({ td: column.textContent.trim() });
            });
            tr.push({ tr: td });
          });
          results.push({ head: th, body: tr });
        });
        return results;
      }

      const images: ScrapperImage[] = [];
      document.querySelectorAll('img').forEach((img) => {
        if (img.src) {
          images.push({
            id: img.id,
            class: img.className,
            alt: img.alt,
            src: img.src,
          });
        }
      });

      const links: ScrapperLink[] = [];
      document.querySelectorAll('a').forEach((a) => {
        if (a.href && !a.href.includes('javascript:void(0)')) {
          links.push({
            id: a.id,
            class: a.className,
            text: a.textContent.trim(),
            href: a.href,
          });
        }
      });

      return {
        meta: {
          keywords: querySelector('meta[name="keywords"]'),
          description: querySelector('meta[name="description"]'),
          imageurl: querySelector('meta[name="twitter:image"]'),
          ogtitle: querySelector('meta[property="og:title"]'),
          ogimage: querySelector('meta[property="og:image"]'),
          ogdescription: querySelector('meta[property="og:description"]'),
        },
        h1: querySelectorAll('h1'),
        h2: querySelectorAll('h2'),
        h3: querySelectorAll('h3'),
        img: images,
        a: links,
        p: querySelectorAll('p'),
        tables: queryTable(),
      } as Scrapper;
    });

    await browser.close();

    return { title, ...result };
  }
}
