import React from 'react';

const Outgoing = () => {
    return (
        <thead>
            <tr>
                <th colSpan="14" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    ETHIOPIAN TOURIST TRADING ENTERPRISE<br />
                    ኢትዮጵያ ቱሪስት ንግድ ስራ ድርጅት<br />
                    <span style={{ fontWeight: 'normal' }}>OUTGOING RECORDS/DOCUMENTS REGISTRATION FORM</span><br />
                    <span style={{ fontWeight: 'normal' }}>የወጪ ሠነዶችና ረከርዶች መመዝገቢያ ቅፅ</span>
                </th>
            </tr>
            <tr>
                <th>የምዝገባ ቁጥር<br />Registration No.</th>
                <th>የተመዘገበበት ቀን<br />Registration Date</th>
                <th>የረከርዱ ርዕስ ጉዳዩ<br />Title of the Record/Document/Subject</th>
                <th>የላኪው ስም /የሰነዱ ምንጭ<br />Source/Sender of the Document/ Record</th>
                <th>አባሪ ሠነዶች<br />Enclosures</th>
                <th>የሚላክለት ስም<br />Send to</th>
                <th>ሠነዱ ኮፒ የተያያዘበት የፋይል ቁጥር<br />File No.</th>
                <th>የመዝጋቢው ስምና ፊርማ<br />Registered by Name & Sign.</th>
                <th>ምላሽ ይፈልጋል<br />Response Required</th>
                <th>የምላሽ ቁጥር<br />Reply Outgoing Reference</th>
                <th>የምላሽ ደብዳቤ ቁጥር<br />Res.Ref.Let.No.</th>
                <th>ምላሽ የተሰጠበት ቀን<br />Response Date</th>
                <th>የምላሽ ሁኔታ ተዘግቷል /አልተዘጋም<br />Correspondence Closed/Open</th>
                <th>አፈፃፀም<br />Implementation</th>
                <th>የተቀባይ ፊርማ<br />Signature</th>
            </tr>
        </thead>
    );
};

export default Outgoing;
