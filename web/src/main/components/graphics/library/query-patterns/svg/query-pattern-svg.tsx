import { Boxes } from "../components/components/boxes/boxes";
import { Header } from "../components/components/header/header";
import { RequestObjects } from "../components/components/request-objects/request-objects";
import { T_QUERY_OPTION } from "../components/utils/types";

export const QueryPatternSvg = ({ queryOption }: { queryOption: T_QUERY_OPTION }) => {
  return (
    <>
      <Header queryOption={queryOption} />

      <RequestObjects queryOption={queryOption} />

      <Boxes queryOption={queryOption} />
    </>
  );
};
