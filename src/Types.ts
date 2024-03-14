type Message = {
	id: number | null;
	userId: number | null;
	Data: string | null;
}

type timeLineElement = {
	id: number | null;
	typeOf: Message;
}

export type { Message, timeLineElement };