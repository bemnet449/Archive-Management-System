import React from 'react';

const INCOMING = () => {
    return (
        <thead>
            <tr>
                <th colSpan="11" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    ETHIOPIAN TOURIST TRADING ENTERPRISE<br />
                    ኢትዮጵያ ቱሪስት ንግድ ስራ ድርጅት<br />
                    <span style={{ fontWeight: 'normal' }}>INCOMING RECORDS/DOCUMENTS REGISTRATION FORM</span><br />
                    <span style={{ fontWeight: 'normal' }}>የገቢ ሠነዶችና ረከርዶች መመዝገቢያ ቅፅ</span>
                </th>
            </tr>
            <tr>
                <th>የምዝገባ ቁጥር<br />Registration No.</th>
                <th>አባሪ ሠነዶች<br />Enclosures</th>
                <th>የላኪው ስም /የሰነዱ ምንጭ<br />Source/Sender of the Document/ Record</th>
                <th>የረከርዱ ርዕስ ጉዳዩ<br />Title of the Record/Document/Subject</th>
                <th>የደረሰበት ቀን<br />Date Received</th>
                <th>የተመራለት ቀን<br />Referred to</th>
                <th>ሠነደዱ የተያያዘበት የፋይል ቁጥር<br />File No.</th>
                <th>የመዝጋቢው ስምና ፊርማ<br />Registered by Name & Sign.</th>
                <th>አፈፃፀም<br />Implementation</th>
                <th>የተቀባይ ፊርማ<br />Signature</th>
            </tr>
        </thead>
    );
};

export default INCOMING;
