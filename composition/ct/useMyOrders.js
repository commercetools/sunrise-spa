import gql from 'graphql-tag';
import { useState } from 'react';
import useQueryFacade from '../useQueryFacade';
const query = gql`
  query MyOrders($limit: Int, $offset: Int) {
    MyOrders: me {
      orders(
        sort: "createdAt desc"
        limit: $limit
        offset: $offset
      ) {
        total
        results {
          orderId: id
          orderNumber
          totalPrice {
            centAmount
            currencyCode
            fractionDigits
          }
          createdAt
          shipmentState
          paymentState
          paymentInfo {
            payments {
              paymentStatus {
                interfaceCode
              }
            }
          }
        }
      }
    }
  }
`;

function useMyOrders({ limit, offset }) {
  const [orders, setOrders] = useState(null);
  const [total, setTotal] = useState(null);

  const { loading, error } = useQueryFacade(query, {
    variables: { limit, offset },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setOrders(data.MyOrders.orders.results);
      setTotal(data.MyOrders.orders.total);
    },
  });

  return { loading, error, orders, total };
}
export default useMyOrders;
