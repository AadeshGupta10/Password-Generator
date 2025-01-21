import { useEffect, useRef, useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6';

const App = () => {

    const min = 4;
    const max = 32;

    const [range, setRange] = useState((max / 2).toString());
    const [lowerCaseAllowed, setLowerCaseAllowed] = useState(true);
    const [UpperCaseAllowed, setUpperCaseAllowed] = useState(false);
    const [numbersAllowed, setNumbersAllowed] = useState(false);
    const [symbolsAllowed, setSymbolsAllowed] = useState(false);
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(true);
    const [copy, setCopy] = useState(false);

    useEffect(() => {
        let pass = "";
        let str = "";

        if (lowerCaseAllowed) str += "abcdefghijklmnopqrstuvwxyz";
        if (UpperCaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (numbersAllowed) str += "0123456789";
        if (symbolsAllowed) str += "!@#$%^&*()~`_-=+{}[]|\:;<>,.?/";

        for (let i = 0; i < parseInt(range); i++) {
            pass += str.charAt(Math.floor(Math.random() * (str.length + 1)));
        }

        setVisible(true)

        if (!lowerCaseAllowed && !UpperCaseAllowed && !numbersAllowed && !symbolsAllowed) setVisible(false);

        setPassword(pass);
    }, [range, lowerCaseAllowed, UpperCaseAllowed, numbersAllowed, symbolsAllowed]);

    const passwordRef = useRef<HTMLInputElement>(null);

    const copyToClipboard = () => {
        setCopy(true);
        window.navigator.clipboard.writeText(password);

        setTimeout(() => {
            setCopy(false)
        }, 1500)
    }

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='pt-3 w-full md:w-[28rem] bg-zinc-900 rounded-lg'>
                <label className='w-full text-center text-white h3 m-0 fw-semibold'>
                    Password Generator
                </label>
                <hr className='border-2 border-zinc-400' />

                <div className='px-4 pb-4'>
                    {/* Input */}
                    <div className='flex items-center bg-black rounded-md overflow-hidden border-2 border-zinc-600 p-0 h-10'>
                        <input type="text"
                            className='text-white tracking-wider bg-transparent px-3 outline-none h-full w-full cursor-default'
                            value={password}
                            minLength={min}
                            maxLength={max}
                            id="password"
                            disabled
                            ref={passwordRef} />
                        {
                            copy ?
                                <FaCheck className='text-green-600 text-xl mx-2 cursor-pointer' title='Copy' onClick={copyToClipboard} />
                                : visible ?
                                    <FaCopy className='text-white text-xl mx-2 cursor-pointer' title='Copy' onClick={copyToClipboard} />
                                    : ""
                        }
                    </div>

                    {/* Range */}
                    <div className='mt-3'>
                        <div className='bg-white h-2 rounded-full'>
                            <div className={`${parseInt(range) <= 7 ?
                                "w-3/12 bg-red-700"
                                : parseInt(range) <= 16 ?
                                    "w-6/12 bg-amber-500"
                                    : parseInt(range) <= 23 ?
                                        "w-9/12 bg-green-600"
                                        : "w-full bg-green-800"}
                                  h-full rounded-full transition-all`} />
                        </div>
                        <div className='mt-3'>
                            <div className='mb-1 text-white flex items-center justify-between'>
                                <label className='fw-semibold text-lg'>
                                    Password Length
                                </label>
                                <label className='text-md'>
                                    {range}
                                </label>
                            </div>
                            <input type="range"
                                className='form-range'
                                min={min}
                                max={max}
                                step={1}
                                value={range}
                                onChange={(e) => setRange(e.target.value)} />
                        </div>
                    </div>

                    {/* Setting */}
                    <div className='text-white mt-2 fw-semibold'>
                        <label className='text-lg'>
                            Password Setting
                        </label>
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-2 gap-3">
                            <div className="flex items-center">
                                <input type="checkbox"
                                    className="me-2 cursor-pointer"
                                    id="lowercase"
                                    defaultChecked={lowerCaseAllowed}
                                    onChange={() => { setLowerCaseAllowed((prev) => !prev) }} />
                                <label htmlFor='lowercase'
                                    className='cursor-pointer'>
                                    Lowercase (a-z)
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox"
                                    className="me-2 cursor-pointer"
                                    id="uppercase"
                                    defaultChecked={UpperCaseAllowed}
                                    onChange={() => { setUpperCaseAllowed((prev) => !prev) }} />
                                <label htmlFor='uppercase'
                                    className='cursor-pointer'>
                                    Uppercase (A-Z)
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox"
                                    className="me-2 cursor-pointer"
                                    id="numbers"
                                    defaultChecked={numbersAllowed}
                                    onChange={() => { setNumbersAllowed((prev) => !prev) }} />
                                <label htmlFor='numbers'
                                    className='cursor-pointer'>
                                    Numbers (0-9)
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox"
                                    className="me-2 cursor-pointer"
                                    id="symbols"
                                    defaultChecked={symbolsAllowed}
                                    onChange={() => { setSymbolsAllowed((prev) => !prev) }} />
                                <label htmlFor='symbols'
                                    className='cursor-pointer'>
                                    Symbols (!@#$)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App