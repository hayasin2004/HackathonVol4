type MessageBase<Req = void, Res = void> = {
	req: Req;
	res: Res;
};

export interface MessageMetadata
	extends Record<string, MessageBase<unknown, unknown>> {
	'github-file-tree': MessageBase<{ url: string }, string>;
}
