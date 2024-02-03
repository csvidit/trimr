type Match = {
  _document: {
    createTime: {
      timestamp: {
        nanoseconds: number;
        seconds: number;
      };
    };
    data: {
      value: {
        mapValue: {
          fields: {
            active: {
              booleanValue: boolean;
            };
            originalUrl: {
              stringValue: string;
            };
            trimmedSlug: {
              stringValue: string;
            };
            trimmedUrl: {
              stringValue: string;
            };
            version: {
              integerValue: number;
            };
            clickCount: {
              integerValue: number;
            };
            createdOn: {
              stringValue: string;
            };
          };
        };
      };
    };
  };
};
