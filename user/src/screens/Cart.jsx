import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { DataTable } from "react-native-paper";
const optionsPerPage = [2, 3, 4];
export default function Cart({ route, navigation }) {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  // const { cartData } = route.params;
  const cartData = {
    perfume: {
      id: 2,
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
      price: 20000,
      title: "Melati",
    },
    pickup: false,
    service: {
      id: 3,
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
      title: "Setrika Aja",
    },
    treatments: [
      {
        id: 1,
        title: "Handuk",
        price: 10000,
        qty: 2,
      },
      {
        id: 3,
        title: "Sepatu",
        price: 30000,
        qty: 4,
      },
    ],
  };

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Item</DataTable.Title>
          <DataTable.Title numeric>Qty</DataTable.Title>
          <DataTable.Title numeric>Price</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>{cartData.service.title}</DataTable.Cell>
          <DataTable.Cell numeric>-</DataTable.Cell>
          <DataTable.Cell numeric>-</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>{cartData.perfume.title}</DataTable.Cell>
          <DataTable.Cell numeric>-</DataTable.Cell>
          <DataTable.Cell numeric>{cartData.perfume.price}</DataTable.Cell>
        </DataTable.Row>

        {cartData.treatments.map((treat) => {
          return (
            <DataTable.Row>
              <DataTable.Cell>{treat.title}</DataTable.Cell>
              <DataTable.Cell numeric>-</DataTable.Cell>
              <DataTable.Cell numeric>{treat.price}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
        <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={"Rows per page"}
        />
      </DataTable>
    </>
  );
}
