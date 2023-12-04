import { Controller, Get } from '@nestjs/common';
import { DataGenerateService } from './scrape/data-generate.service';
import { JsonService } from './data-json/json.service';

@Controller('gruplac-api')
export class AppController {
  constructor(
    private readonly appService: DataGenerateService,
    private readonly jsonService: JsonService,
  ) {}

  @Get()
  async generateAllData() {
    await Promise.all([
      this.generateData('generateArticles', './src/data/articles.json'),
      this.generateData(
        'generateBookChapters',
        './src/data/book-chapters.json',
      ),
      this.generateData('generateEditions', './src/data/editions.json'),
      this.generateData('generateInformation', './src/data/information.json'),
      this.generateData('generateNamesPage', './src/data/name-page.json'),
      this.generateData(
        'generateOtherArticles',
        './src/data/other-articles.json',
      ),
      this.generateData('generatePlan', './src/data/plan.json'),
      this.generateData('generateProjects', './src/data/projects.json'),
      this.generateData(
        'generateResearchLines',
        './src/data/research-lines.json',
      ),
      this.generateData(
        'generateResearchReports',
        './src/data/research-reports.json',
      ),
      this.generateData(
        'generateScientificEvents',
        './src/data/scientific-events.json',
      ),
      this.generateData(
        'generateScientificRecords',
        './src/data/scientific-records.json',
      ),
      this.generateData('generateSoftwares', './src/data/softwares.json'),
      this.generateData(
        'generateSupervisedProjects',
        './src/data/supervised-projects.json',
      ),
      this.generateData('generateTeamMembers', './src/data/team-members.json'),
      this.generateData(
        'generateTechnicalReports',
        './src/data/technical-reports.json',
      ),
      this.generateData(
        'generateWorkingPapers',
        './src/data/working-papers.json',
      ),
    ]);
    return true;
  }

  @Get('/articles')
  async generateArticles() {
    return this.generateData('generateArticles', './src/data/articles.json');
  }

  @Get('/book-chapters')
  async generateBookChapters() {
    return this.generateData(
      'generateBookChapters',
      './src/data/book-chapters.json',
    );
  }

  @Get('/editions')
  async generateEditions() {
    return this.generateData('generateEditions', './src/data/editions.json');
  }

  @Get('/information')
  async generateGeneralInformation() {
    return this.generateData(
      'generateInformation',
      './src/data/information.json',
    );
  }

  @Get('/names-page')
  async generateNamesPage() {
    return this.generateData('generateNamesPage', './src/data/name-page.json');
  }

  @Get('/other-articles')
  async generateOtherArticles() {
    return this.generateData(
      'generateOtherArticles',
      './src/data/other-articles.json',
    );
  }

  @Get('/plan')
  async generatePlan() {
    return this.generateData('generatePlan', './src/data/plan.json');
  }

  @Get('/projects')
  async generateProjects() {
    return this.generateData('generateProjects', './src/data/projects.json');
  }

  @Get('/research-lines')
  async generateResearchLines() {
    return this.generateData(
      'generateResearchLines',
      './src/data/research-lines.json',
    );
  }

  @Get('/research-reports')
  async generateResearchReports() {
    return this.generateData(
      'generateResearchReports',
      './src/data/research-reports.json',
    );
  }

  @Get('/scientific-events')
  async generateScientificEvents() {
    return this.generateData(
      'generateScientificEvents',
      './src/data/scientific-events.json',
    );
  }

  @Get('/scientific-records')
  async generateScientificRecords() {
    return this.generateData(
      'generateScientificRecords',
      './src/data/scientific-records.json',
    );
  }

  @Get('/softwares')
  async generateSoftwares() {
    return this.generateData('generateSoftwares', './src/data/softwares.json');
  }

  @Get('/supervised-projects')
  async generateSupervisedProjects() {
    return this.generateData(
      'generateSupervisedProjects',
      './src/data/supervised-projects.json',
    );
  }

  @Get('/team-members')
  async generateTeamMembers() {
    return this.generateData(
      'generateTeamMembers',
      './src/data/team-members.json',
    );
  }

  @Get('/technical-reports')
  async generateTechnicalReports() {
    return this.generateData(
      'generateTechnicalReports',
      './src/data/technical-reports.json',
    );
  }

  @Get('/working-papers')
  async generateWorkingPapers() {
    return this.generateData(
      'generateWorkingPapers',
      './src/data/working-papers.json',
    );
  }

  private async generateData(method: string, jsonPath: string) {
    if (!(await this.jsonService.jsonFileExists(jsonPath))) {
      await this.appService[method]();
    }
    return this.jsonService.readJson(jsonPath);
  }
}
