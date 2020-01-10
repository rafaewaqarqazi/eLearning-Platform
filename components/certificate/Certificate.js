import React from 'react';
import { Page, Text, View, Document, StyleSheet,Image} from '@react-pdf/renderer';
import moment from 'moment';
// Create styles
const styles = StyleSheet.create({
    body:{
        fontSize:24,
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        border:'1px solid #000',
        padding:5
    },
    logo:{
        width:78,
        height:78,
        borderRadius: 50,
        marginTop: 32
    },
    logoTitle:{
        marginLeft: 10
    },
    divider:{
        backgroundColor:'#000',
        height:'1px',
        marginTop:10
    },
    date:{
        fontSize: 10,
        color: 'grey'
    },
    leftMargin: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 150,
        alignItems: 'center'
    },
    bgImage: {
        position: 'absolute',
        minWidth: '100%',
        minHeight: '100%',
        display: 'block',
        height: '100%',
        width: '100%',
    },
    name: {
        fontSize: 20,
        marginTop: 40
    },
    instructorName: {
        marginTop: 40,
        borderBottom: 1,
        fontSize: 14
    },
    instructor:{
        marginTop: 5,
        fontSize: 11
    },
    courseTitle: {
        fontSize: 20,
        marginTop: 20
    },
    desc: {
        fontSize: 10,
        color: 'grey',
        marginTop: 20
    }
});

const Certificate = ({studentName,courseTitle,instructorName}) => (
    <Document >
        <Page size="A4" style={styles.body} orientation='landscape' >
            <Image src='/static/avatar/certificateBg.jpg' style={styles.bgImage}/>
            <View style={styles.leftMargin}>
                <Text style={styles.date}>{moment(Date.now()).format('DD/MM/YY')}</Text>
                <Text style={styles.name}>{studentName}</Text>
                <Text style={styles.desc}>Has Successfully Completed</Text>
                <Text style={styles.desc}>an online non-credit course through eLearning Platform</Text>
                <Text style={styles.courseTitle}>{courseTitle}</Text>
                <Text style={styles.instructorName}>{instructorName}</Text>
                <Text style={styles.instructor}>Instructor</Text>
                <Image src='/static/avatar/elp-logo.png' style={styles.logo}/>
            </View>

        </Page>
    </Document>
);

export default Certificate;