/**
 * 現在アクティブなタブのURLを取得する関数。
 *
 * この関数は現在のウィンドウでアクティブなタブのURLを
 * `chrome.tabs.query`を使って非同期に取得すする。
 *
 * @returns {Promise<string>} 現在アクティブなタブのURL。取得できない場合は空文字を返す。
 * @throws {Error} Chrome API 呼び出し中にエラーが発生した場合に reject する。
 */
export const getActiveTabUrl = async (): Promise<string> => {
	return new Promise((resolve, reject) => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
			} else {
				const url = tabs[0]?.url ?? '';
				resolve(url);
			}
		});
	});
};
