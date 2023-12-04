import { Injectable } from '@nestjs/common';
import { BrowserConfigService } from './browser-config.service';
import { GROUP_LIST } from '../constant/group-list';
import { JsonService } from '../data-json/json.service';

@Injectable()
export class DataGenerateService {
  constructor(
    private readonly browserConfigService: BrowserConfigService,
    private readonly writeJsonService: JsonService,
  ) {}

  async generateNamesPage() {
    const browser = await this.browserConfigService.getBrowser();
    const names = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        return page.$eval('body > span', (selector) => selector.textContent);
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      names,
      './src/data/name-page.json',
    );
  }

  async generateInformation() {
    const browser = await this.browserConfigService.getBrowser();
    const generalInfo = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const tableInfo = await page.evaluate(() => {
          const table = document.querySelector("table[width='100%']");
          const cells = table.querySelectorAll('.celdas2');
          return {
            date: cells[0].textContent.trim(),
            department: cells[1].textContent.trim(),
            leader: cells[2].textContent.trim(),
            certificate: cells[3].textContent.trim(),
            webpage: cells[4].textContent.trim(),
            email: cells[5].textContent.trim(),
            classification: cells[6].textContent.trim(),
            knowledgeArea: cells[7].textContent.trim(),
            program: cells[8].textContent.trim(),
            program2: cells[9].textContent.trim(),
          };
        });
        return tableInfo;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      generalInfo,
      './src/data/information.json',
    );
  }

  async generatePlan() {
    const browser = await this.browserConfigService.getBrowser();
    const additionalInfo = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const plan = await page.evaluate(() => {
          const thirdTable = document.querySelectorAll('table')[2];
          const secondRow = thirdTable.querySelector('tr:nth-child(2)');
          return secondRow.textContent.trim();
        });
        return plan;
      }),
    );

    await browser.close();
    await this.writeJsonService.generateJson(
      additionalInfo,
      './src/data/plan.json',
    );
  }

  async generateResearchLines() {
    const browser = await this.browserConfigService.getBrowser();
    const researchLines = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const researchLinesData = await page.evaluate(() => {
          const lines = [];
          const rows = Array.from(
            document.querySelectorAll('table')[3].querySelectorAll('tr'),
          ).slice(1);
          rows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll('td'));
            if (cells.length > 0) {
              lines.push(cells[0].textContent.trim());
            }
          });
          return lines;
        });
        return researchLinesData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      researchLines,
      './src/data/research-lines.json',
    );
  }
  async generateTeamMembers() {
    const browser = await this.browserConfigService.getBrowser();
    const teamMembers = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const members = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[4];
          const rows = table.querySelectorAll('tr');
          const names = [];
          for (let i = 2; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              names.push(cells[0].textContent.trim());
            }
          }
          return names;
        });
        return members;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      teamMembers,
      './src/data/team-members.json',
    );
  }

  async generateArticles() {
    const browser = await this.browserConfigService.getBrowser();
    const articles = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const articleData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[13];
          const rows = table.querySelectorAll('tr');
          const articles = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              articles.push(cells[1].textContent.trim());
            }
          }

          return articles;
        });

        return articleData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      articles,
      './src/data/articles.json',
    );
  }

  async generateBookChapters() {
    const browser = await this.browserConfigService.getBrowser();
    const bookChapters = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const chapterData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[16];
          const rows = table.querySelectorAll('tr');
          const chapters = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              chapters.push(cells[1].textContent.trim());
            }
          }
          return chapters;
        });
        return chapterData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      bookChapters,
      './src/data/book-chapters.json',
    );
  }

  async generateWorkingPapers() {
    const browser = await this.browserConfigService.getBrowser();
    const workingPapers = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const paperData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[20];
          const rows = table.querySelectorAll('tr');
          const papers = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              papers.push(cells[1].textContent.trim());
            }
          }
          return papers;
        });
        return paperData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      workingPapers,
      './src/data/working-papers.json',
    );
  }

  async generateOtherArticles() {
    const browser = await this.browserConfigService.getBrowser();
    const otherArticles = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const articleData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[19];
          const rows = table.querySelectorAll('tr');
          const articles = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              articles.push(cells[1].textContent.trim());
            }
          }
          return articles;
        });
        return articleData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      otherArticles,
      './src/data/other-articles.json',
    );
  }

  async generateTechnicalReports() {
    const browser = await this.browserConfigService.getBrowser();
    const technicalReports = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const reportData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[31];
          const rows = table.querySelectorAll('tr');
          const reports = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              reports.push(cells[1].textContent.trim());
            }
          }
          return reports;
        });
        return reportData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      technicalReports,
      './src/data/technical-reports.json',
    );
  }

  async generateScientificRecords() {
    const browser = await this.browserConfigService.getBrowser();
    const scientificRecords = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const recordData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[37];
          const rows = table.querySelectorAll('tr');
          const records = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              records.push(cells[1].textContent.trim());
            }
          }
          return records;
        });
        return recordData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      scientificRecords,
      './src/data/scientific-records.json',
    );
  }

  async generateSoftwares() {
    const browser = await this.browserConfigService.getBrowser();
    const softwares = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const softwareData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[48];
          const rows = table.querySelectorAll('tr');
          const softwareList = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              softwareList.push(cells[1].textContent.trim());
            }
          }
          return softwareList;
        });
        return softwareData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      softwares,
      './src/data/softwares.json',
    );
  }

  async generateScientificEvents() {
    const browser = await this.browserConfigService.getBrowser();
    const scientificEvents = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const eventData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[63];
          const rows = table.querySelectorAll('tr');
          const events = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              events.push(cells[1].textContent.trim());
            }
          }

          return events;
        });

        return eventData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      scientificEvents,
      './src/data/scientific-events.json',
    );
  }

  async generateEditions() {
    const browser = await this.browserConfigService.getBrowser();
    const editions = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const editionData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[62];
          const rows = table.querySelectorAll('tr');
          const editionList = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              editionList.push(cells[1].textContent.trim());
            }
          }
          return editionList;
        });
        return editionData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      editions,
      './src/data/editions.json',
    );
  }
  async generateResearchReports() {
    const browser = await this.browserConfigService.getBrowser();
    const researchReports = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const reportData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[64];
          const rows = table.querySelectorAll('tr');
          const reports = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              reports.push(cells[1].textContent.trim());
            }
          }

          return reports;
        });

        return reportData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      researchReports,
      './src/data/research-reports.json',
    );
  }

  async generateProjects() {
    const browser = await this.browserConfigService.getBrowser();
    const projects = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const projectData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[84];
          const rows = table.querySelectorAll('tr');
          const projectList = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              projectList.push(cells[1].textContent.trim());
            }
          }
          return projectList;
        });
        return projectData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      projects,
      './src/data/projects.json',
    );
  }
  async generateSupervisedProjects() {
    const browser = await this.browserConfigService.getBrowser();
    const supervisedProjects = await Promise.all(
      GROUP_LIST.map(async (group) => {
        const page = await browser.newPage();
        await page.goto(group);
        const projectData = await page.evaluate(() => {
          const table = document.querySelectorAll('table')[79];
          const rows = table.querySelectorAll('tr');
          const projectList = [];
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            if (cells.length > 0) {
              projectList.push(cells[1].textContent.trim());
            }
          }
          return projectList;
        });
        return projectData;
      }),
    );
    await browser.close();
    await this.writeJsonService.generateJson(
      supervisedProjects,
      './src/data/supervised-projects.json',
    );
  }
}
