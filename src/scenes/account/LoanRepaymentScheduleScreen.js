import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {
  Appbar,
  Caption,
  TextInput,
  Button,
  Subheading,
  DataTable,
} from 'react-native-paper';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {useToast} from 'react-native-paper-toast';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import { FindUpcomingLoanRepaymentScheduleByLoanID } from '../../query/ProductQuery';

const LoanRepaymentScheduleScreen = ({navigation, route}) => {
    const optionsPerPage = [2, 3, 4];

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

    const toaster = useToast();
    const {loan} = route.params;

  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Jadwal Angsuran Kredit" />
      </Appbar.Header>
      <ScrollView style={styles.screen}>
        <View style={styles.formSection}>
          <Caption>Nomor Rekening</Caption>
            <TextInput
                style={styles.textInput}
                mode="flat"
                disabled={true}
                value={loan.id}
            />

        <Subheading style={styles.sectionHeading}>Jadwal</Subheading>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Angs ke.</DataTable.Title>
                    <DataTable.Title>Tanggal</DataTable.Title>
                    <DataTable.Title>Tagihan</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell>1</DataTable.Cell>
                    <DataTable.Cell>02-07-2021</DataTable.Cell>
                    <DataTable.Cell>Rp 2.300.000,00</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>2</DataTable.Cell>
                    <DataTable.Cell>02-08-2021</DataTable.Cell>
                    <DataTable.Cell>Rp 2.300.000,00</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>3</DataTable.Cell>
                    <DataTable.Cell>02-09-2021</DataTable.Cell>
                    <DataTable.Cell>Rp 2.300.000,00</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>4</DataTable.Cell>
                    <DataTable.Cell>02-10-2021</DataTable.Cell>
                    <DataTable.Cell>Rp 2.300.000,00</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>5</DataTable.Cell>
                    <DataTable.Cell>02-11-2021</DataTable.Cell>
                    <DataTable.Cell>Rp 2.300.000,00</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>6</DataTable.Cell>
                    <DataTable.Cell>02-12-2021</DataTable.Cell>
                    <DataTable.Cell>Rp 2.300.000,00</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Pagination
                    page={page}
                    numberOfPages={3}
                    onPageChange={(page) => setPage(page)}
                    label="1-2 of 6"
                    optionsPerPage={optionsPerPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    showFastPagination
                    optionsLabel={'Rows per page'}
                />
            </DataTable>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F8FB',
    flexGrow: 1,
  },
  appbarHeader: {
    backgroundColor: '#F5F8FB',
    elevation: 0,
  },
  formSection: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 50,
  },
  textInput: {
    height: 45,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 5,
    borderColor: '#F5F8FB',

  },
  textInputMultiline: {
    backgroundColor: 'white',
    marginBottom: 5,
    borderColor: '#F5F8FB',
  },
  submitButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 0,
  },
  searchIcon: {
    marginTop: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  modal: {
    margin: 15,
  },
  modalTitle: {
    marginBottom: 10,
  },
  sectionHeading: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  dropdownMenuPlaceholder: {
    width: '100%',
    height: 40,
    borderRadius: 0,
  },
});

export default LoanRepaymentScheduleScreen;
