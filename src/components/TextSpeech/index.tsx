import { Flex, Text, Tooltip } from '@chakra-ui/react'
import { FunctionComponent, useEffect, useState } from 'react'
import { IoMicCircleSharp, IoPlayCircle, IoPlayCircleOutline } from 'react-icons/io5'

interface TextSpeechProps {
  title?: string;
  content?: string;
}

const TextSpeech: FunctionComponent<TextSpeechProps> = ({ title, content }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const synth = window.speechSynthesis;

  useEffect(() => {
    const newUtterance = new SpeechSynthesisUtterance(`${title} ${content}`);
    newUtterance.lang = "en-US";
    setUtterance(newUtterance);

    return () => {
      synth.cancel();
    }
  }, [title, content]);


  const handlePlay = () => {
    if (utterance && !isSpeaking) {
      synth.speak(utterance);
      setIsSpeaking(true);
      setIsPaused(false);
    } else if (isPaused) {
      synth.resume();
      setIsPaused(false);
    }
  }

  const handlePause = () => {
    if (synth.speaking && !isPaused) {
      synth.pause();
      setIsPaused(true);
    }
  }

  const handleStop = () => {
    synth.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }

  return (
    <Flex gap={3} alignItems={"center"}>
      {!isSpeaking || isPaused ? (
        <Tooltip label={isPaused ? 'Resume' : 'Play'} placement="top">
          <Text as="span">
            <IoPlayCircleOutline size="21px" onClick={handlePlay} cursor="pointer" />
          </Text>
        </Tooltip>
      ): (
        <Tooltip label={"Stop Listening"} placement="top">
          <Text as="span">
              <IoPlayCircle size="25px" onClick={handleStop} cursor="pointer" />
          </Text>
        </Tooltip>
      )}

      {isSpeaking && !isPaused && (
        <Tooltip label={"Pause Listening"} placement="top">
          <Text as="span">

              <IoMicCircleSharp size={"25px"} onClick={handlePause} cursor="pointer" />
          </Text>
        </Tooltip>
      )}
    </Flex>
  )
}

export default TextSpeech;


// interface TextSpeechProps {
//   title?: string;
//   content?: string;
// }

// const TextSpeech: FunctionComponent<TextSpeechProps> = ({ title, content }) => {
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

//   const synth = window.speechSynthesis;

//   useEffect(() => {
//     const handleVoicesChanged = () => {
//       const voices = synth.getVoices();
//       if (voices.length > 0) {
//         const newUtterance = new SpeechSynthesisUtterance(`${title} ${content}`);
//         newUtterance.voice = voices.find(voice => voice.lang === 'en-US'); // Set preferred voice
//         newUtterance.lang = "en-US";

//         newUtterance.onend = () => {
//           setIsSpeaking(false); // Reset speaking status when finished
//           setIsPaused(false);
//         };

//         newUtterance.onerror = (event) => {
//           console.error("Speech synthesis error:", event.error);
//         };

//         setUtterance(newUtterance);
//       }
//     };

//     if (synth.getVoices().length > 0) {
//       handleVoicesChanged();
//     } else {
//       synth.onvoiceschanged = handleVoicesChanged;
//     }

//     return () => {
//       synth.cancel(); // Cleanup on component unmount
//     };
//   }, [title, content, synth]);

//   const handlePlay = () => {
//     if (utterance && !isSpeaking) {
//       synth.speak(utterance);
//       setIsSpeaking(true);
//       setIsPaused(false);
//     } else if (isPaused) {
//       synth.resume();
//       setIsPaused(false);
//     }
//   }

//   const handlePause = () => {
//     if (synth.speaking && !isPaused) {
//       synth.pause();
//       setIsPaused(true);
//     }
//   }

//   const handleStop = () => {
//     synth.cancel();
//     setIsSpeaking(false);
//     setIsPaused(false);
//   }

//   return (
//     <Flex gap={3} alignItems={"center"}>
//       {!isSpeaking || isPaused ? (
//         <Tooltip label={isPaused ? 'Resume' : 'Play'} placement="top">
//           <Text as="span">
//             <IoPlayCircleOutline size="21px" onClick={handlePlay} cursor="pointer" />
//           </Text>
//         </Tooltip>
//       ) : (
//         <Tooltip label={"Stop Listening"} placement="top">
//           <Text as="span">
//             <IoPlayCircle size="25px" onClick={handleStop} cursor="pointer" />
//           </Text>
//         </Tooltip>
//       )}

//       {isSpeaking && !isPaused && (
//         <Tooltip label={"Pause Listening"} placement="top">
//           <Text as="span">
//             <IoMicCircleSharp size={"25px"} onClick={handlePause} cursor="pointer" />
//           </Text>
//         </Tooltip>
//       )}
//     </Flex>
//   );
// }

// export default TextSpeech;
