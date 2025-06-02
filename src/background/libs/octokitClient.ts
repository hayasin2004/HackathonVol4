import { Octokit } from '@octokit/rest';

// GitHub APIクライアントのシングルトンインスタンスを作成
// - 認証トークンを使うことでプライベートリポジトリのアクセスや
//   APIのレートリミット拡張 (5000回/h) を可能にする
// - トークンがない場合は未認証リクエスト (60回/hの制限) になる

const getOctokitClient = new Octokit({
	auth: process.env.PLASMO_PUBLIC_GITHUB_TOKEN,
});

export default getOctokitClient;
