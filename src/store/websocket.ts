import type { TWSToServer } from '@/types'
import { defineStore } from 'pinia'
import { ws } from '@/services/WS'
import { ModuleName } from '@/types/const_module'

export const websocketModule = defineStore(ModuleName.WEBSOCKET, {

	state: () => ({ connected: false }),

	actions: {

		closeWS (): void {
			this.set_connected(false)
			ws.closeWs()
		},

		openWs (password: string): void {
			if (!userModule().authenticated) {
				return
			}
			ws.openWs(password)
			ws.connection?.addEventListener('open', () => {
				this.set_connected(true)
			})
		},

		send (data: TWSToServer): void {
			ws.connection?.send(JSON.stringify({
				data,
				unique: true,
			}))
		},

		set_connected (b: boolean): void {
			this.connected = b
		},
	},
})
