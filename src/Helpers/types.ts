export interface weatherType {
	current: any
	daily: any
	hourly: any
	timezone: string
	lat: number
	lon: number
	minutely: any
}

export type city = {
	cityName: string
	fullCity: string
	timezone: string
}

export interface contextType {
	current: any
	daily: any
	hourly: any
	timezone: string
	minutely: any
	loading: boolean
}

export interface searchProps {
	refresh: () => void
	geo: () => void
	search: (
		e: React.FormEvent<HTMLFormElement>,
		inpRef: React.RefObject<HTMLInputElement>
	) => void
}
