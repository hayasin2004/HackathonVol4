export interface ParseGithubUrlReturns {
	owner: string;
	repo: string;
	path?: string;
	repoName?: string;
	repoDescription?: string;
	primaryLanguage?: string;
	directoryTree?: string;
	importantFiles?: string[];
}
