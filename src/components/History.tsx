import HistoryItem from "./HistoryItem";

const History = (props: { data: Array<Match> }) => {
  return props.data.map((item: Match) => {
    const fields = item._document.data.value.mapValue.fields
    return (
      <HistoryItem
        key={fields.trimmedSlug.stringValue}
        originalUrl={fields.originalUrl.stringValue}
        trimmedUrl={fields.trimmedUrl.stringValue}
        dateString={fields.createdOn.stringValue}
        clickCount={fields.clickCount.integerValue}
      />
    );
  });
};

export default History;
