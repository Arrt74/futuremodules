export const getPaginationLayoutData = (pageInfo) => {

  let ret = {
    hasData: false,
    bNoPages: false,
    bMinPages: false,
    bComplexPages: false,
    complexPageIndex1: 0,
    complexPageIndex2: 0,
    complexPageIndex3: 0,
  }

  if (pageInfo && pageInfo.totalCount > 0) {
    ret.hasData = true;
    ret.bNoPages = pageInfo.lastPage === 0;
    ret.bMinPages = pageInfo.lastPage !== 0 && pageInfo.lastPage < 3;
    ret.bComplexPages = pageInfo.lastPage >= 3;
    if (ret.bComplexPages) {
      const isFirstPage = pageInfo.page === 0;
      const isLastPage = pageInfo.page === pageInfo.lastPage;
      const lastPageOff = isLastPage ? -2 : -1;
      ret.complexPageIndex1 = isFirstPage ? 1 : pageInfo.page + lastPageOff + 1;
      ret.complexPageIndex2 = ret.complexPageIndex1 + 1;
      ret.complexPageIndex3 = ret.complexPageIndex2 + 1;
    }
  }

  return ret;
}
