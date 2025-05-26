/* eslint-disable @typescript-eslint/no-explicit-any */
import {cache as reactCache} from "react"
import {unstable_cache as nextCache} from "next/cache"

type Callback = (...args: any[]) => Promise<any>

export function caching<T extends Callback> (cb: T, keyParts: string[], options: {revalidate?: number, tags?: string[] }) {

    return nextCache(reactCache(cb), keyParts, options)
}