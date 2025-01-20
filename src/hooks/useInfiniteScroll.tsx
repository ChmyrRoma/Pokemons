import { useCallback, useEffect, useState } from "react";

interface UseInfiniteScrollProps {
    loadMore: () => Promise<void>;
    hasMore: boolean;
    threshold?: number;
    isSkip?: boolean;
}

export const useInfiniteScroll = ({
 loadMore, hasMore, threshold = 0.8, isSkip = false,
 }: UseInfiniteScrollProps) => {
    const [isFetching, setIsFetching] = useState(false);

    const handleScroll = useCallback(() => {
        if (isFetching || !hasMore) return;

        const scrollPosition = window.scrollY + window.innerHeight;
        const thresholdHeight = document.documentElement.scrollHeight * threshold;

        if (scrollPosition >= thresholdHeight) {
            setIsFetching(true);
        }
    }, [isFetching, hasMore, threshold]);

    useEffect(() => {
        if (!isFetching) return;

        (async () => {
            if (!isSkip) await loadMore();
            setIsFetching(false);
        })()
    }, [isFetching, loadMore, isSkip]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return { isFetching };
};
