import * as React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function LeftTab(){

    return(
        <div>
            <Link href="./addMenu">
            <Button color="inherit">เพิ่มเมนู</Button>
            </Link>
            <h1>เมนู</h1>
            <a>จัดการรายละเอียดเมนู</a>
        </div>
    )
}
