export enum EIssueStatus {
	OPEN = "OPEN",
	IN_PROGRESS = "IN_PROGRESS",
	CLOSED = "CLOSED",
}

export interface IIssueResponse {
	id: string;
	title: string;
	description: string;
	status: EIssueStatus;
}
