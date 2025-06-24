import React, { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { fetchSimilarCities } from "../../api/weather";
export function SearchBar(props: {
    setOptions: React.Dispatch<React.SetStateAction<GeoCity[]>>, updateError: (message: string) => void
}) {
    const placeholders: string[] = useMemo(
        () => ["Search for a city...", "Delhi", "Mumbai", "London", "New York"],
        []
    );
    const [inputVal, setInputVal] = useState<string>("");
    const [placeholder, setPlaceholder] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const [charIndex, setCharIndex] = useState<number>(0);
    const [typing, setTyping] = useState<boolean>(true);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    useEffect(() => {
        if (isFocus) {
            setPlaceholder("");
            return;
        }
        const intevalId = setInterval(() => {
            const currenttext = placeholders[index];
            if (typing) {
                if (charIndex < currenttext.length) {
                    setPlaceholder(currenttext.slice(0, charIndex + 1));
                    setCharIndex((prev) => prev + 1);
                } else {
                    setTyping(false);
                }
            } else {
                if (charIndex > 0) {
                    setPlaceholder(currenttext.slice(0, charIndex - 1));
                    setCharIndex(prev => prev - 1);
                } else {
                    setTyping(true);
                    setIndex(prev => (prev + 1) % placeholders.length)
                }
            }
        }, typing ? 200 : 100);
        return () => clearInterval(intevalId);
    }, [isFocus, typing, index, charIndex, placeholders]);

    useEffect(() => {
        const fetchCities = async () => {
            if (inputVal === "" || inputVal.length < 3) {
                props.setOptions([]);
                return;
            }
            try {
                const response = await fetchSimilarCities(inputVal,3);
                console.log(response.data);
                props.setOptions(response.data as GeoCity[]);
            } catch (err) {
                console.error("Error : fetching Cities", err);
                props.updateError("Error: Fetching Cities.");
            }
        }
        const handler = setTimeout(() => {
            fetchCities();
        }, 500);
        return () => clearTimeout(handler);
    }, [inputVal]);

    return <input type="text" placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={(e) => {
            setIsFocus(false);
            setCharIndex(0);
            e.currentTarget.value = "";
        }}
        onChange={(e) => {
            setInputVal(e.target.value);
        }}
        autoComplete='on'
        autoCorrect='on'
        className="w-full focus:outline-none"
    />
}