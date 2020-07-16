import {
  Div,
  Flex,
  Logo1TextSpan,
  Mx05,
  SecondaryAltColorTextSpanBold
} from "../reactComponentStyles/reactCommon.styled";
import {Pagination} from "react-bootstrap";
import React from "react";
import {getPaginationLayoutData} from "./PaginationLogic";

export const PaginationResults = ({searchQuery, pageInfo, setPage}) => {

  const layoutData = getPaginationLayoutData(pageInfo);

  if ( !layoutData.hasData ) return <></>;

  return (
    <Flex width={"100%"} background={"var(--dark-color-transparent-text-readable)"}
          padding={layoutData.bNoPages ? "8px" : "4px"}
          justifyContent={"center"} borderRadius={"4px"}>
      <Div>
        <SecondaryAltColorTextSpanBold>{pageInfo.totalCount}{" "}</SecondaryAltColorTextSpanBold>
        <Logo1TextSpan> {searchQuery}</Logo1TextSpan>
        <SecondaryAltColorTextSpanBold> available</SecondaryAltColorTextSpanBold>
      </Div>
      <Mx05/>
      <Pagination size={"sm"} className={"mb-0"} variant={"info"}>
        {layoutData.bMinPages &&
        Array.from(Array(pageInfo.lastPage + 1), (x, index) => index).map(elem =>
          <Pagination.Item key={elem} active={elem === pageInfo.page} onClick={() => setPage(elem)}>
            {elem + 1}
          </Pagination.Item>)}
        {layoutData.bComplexPages && <Pagination>
          <Pagination.First disabled={0 === pageInfo.page} onClick={() => setPage(0)}/>
          <Pagination.Prev disabled={!pageInfo.hasPreviousPage} onClick={() => setPage(pageInfo.page - 1)}/>

          <Pagination.Item active={pageInfo.page === layoutData.complexPageIndex1 - 1}
                           onClick={() => setPage(layoutData.complexPageIndex1 - 1)}>{layoutData.complexPageIndex1}</Pagination.Item>
          <Pagination.Item active={pageInfo.page === layoutData.complexPageIndex2 - 1}
                           onClick={() => setPage(layoutData.complexPageIndex2 - 1)}>{layoutData.complexPageIndex2}</Pagination.Item>
          <Pagination.Item active={pageInfo.page === layoutData.complexPageIndex3 - 1}
                           onClick={() => setPage(layoutData.complexPageIndex3 - 1)}>{layoutData.complexPageIndex3}</Pagination.Item>

          <Pagination.Next disabled={!pageInfo.hasNextPage} onClick={() => setPage(pageInfo.page + 1)}/>
          <Pagination.Last disabled={pageInfo.lastPage === pageInfo.page} onClick={() => setPage(pageInfo.lastPage)}/>
        </Pagination>
        }
      </Pagination>
    </Flex>
  )
}
