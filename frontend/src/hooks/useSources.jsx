import React, {useMemo} from 'react'

export const useSortedSource = (sources, sort) => {

  const sortedSources = useMemo(() => {
    if(sort) {
      return [...sources].sort((a,b) => a[sort].localeCompare(b[sort]))
    }
    return sources;
  }, [sort, sources])

  return sortedSources
}

export const useSources = (sources, sort, query) => {

  const sortedSources = useSortedSource(sources, sort)

  const sortedAndSearchedSources = useMemo(() => {
    return sortedSources.filter(source => source.title.toLowerCase().includes(query.toLowerCase()))
  }, [query, sortedSources])

  return sortedAndSearchedSources
}