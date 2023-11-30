import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const Pdf = ({ asset }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    text :{
      fontWeight : 'bold',
      fontSize: "15px"
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Asset Name: {asset.name}</Text>
          <Text>Type: {asset.type}</Text>
          <Text>Request Date: {asset.reqdate}</Text>
          <Text>Price: {asset.price}</Text>
          <Text>User Email : {asset.useremail}</Text>
          <Text>Approval Date: {asset.AppDate}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Pdf;
