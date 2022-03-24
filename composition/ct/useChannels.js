import gql from 'graphql-tag';
import useQueryFacade from '../useQueryFacade';
import { useState, useEffect } from 'react';
import { getValue } from '../../src/lib';

const query = gql`
  query Channels($where: String) {
    channels(where: $where) {
      results {
        id
        name(locale: "en")
        address {
          streetNumber
          streetName
          city
          state
          postalCode
          country
        }
        # add customFieldsRaw to the query and get error
        #   Cannot query field 'customFieldsRaw' on type 'Channel'.
        #   support: https://jira.commercetools.com/browse/SUPPORT-11327
        custom {
          customFieldsRaw {
            name
            value
          }
        }
        geoLocation {
          ... on Point {
            coordinates
          }
        }
      }
    }
  }
`;
const createWhere = (center, searchRadius) => {
  return `geoLocation within circle(${getValue(center).lng},
  ${getValue(center).lat},
  ${(getValue(searchRadius) || 1000000) * 1609.4})
`;
};

function useChannels(center, searchRadius) {
  const [where, setWhere] = useState(
    createWhere(center, searchRadius)
  );
  useEffect(
    () => setWhere(createWhere(center, searchRadius)),
    [center, searchRadius]
  );
  const [channels, setChannels] = useState(null);

  const { loading, error } = useQueryFacade(query, {
    variables: { where },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setChannels(data.channels.results);
    },
  });
  return { loading, error, channels };
}
export default useChannels;
