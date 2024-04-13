export const useValidClick = (target: any, forbiddenTokens: string[]) => {
    return () => {
        return !forbiddenTokens.some(token => target.classList.contains(token));
    }
}