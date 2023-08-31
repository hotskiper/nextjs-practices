import Image from 'next/image'
import styles from './guide.module.css'

const Guide = ()=>{
    return <div className={`flex`}>
        <div className="p-6">Skip {'>'}</div>
        <Image src="/assets/images/guide.png" width={300} height={300} alt=''></Image>
    </div>
}

export default Guide;