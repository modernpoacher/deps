declare global {
  namespace DepsTypes {
    export interface Options {
      maxBuffer: number
      stdio: string
      env: NodeJS.ProcessEnv
    }

    /**
     *  Package or configuration dependencies
     */
    export type Dependencies = Record<string, string>

    /**
     *  A dependency descriptor
     */
    export interface DependencyDescriptor {
      name: string
      version: string
    }

    /**
     *  A package
     */
    export type Package = Record<string, string> & {
      author?: string | { name: string; email: string }
      dependencies?: Dependencies
      devDependencies?: Dependencies
      optionalDependencies?: Dependencies
      bundleDependencies?: Dependencies
      peerDependencies?: Dependencies
    }

    /**
     *  A configuration
     */
    export type Configuration = Record<string, string> & {
      author?: string | { name: string; email: string }
      ignore?: boolean
      message?: string
      dependencies?: Dependencies
      devDependencies?: Dependencies
      optionalDependencies?: Dependencies
      bundleDependencies?: Dependencies
      peerDependencies?: Dependencies
    }
  }
}

export {}
