let videoMapping = {};

// Load video mapping JSON file
fetch('js/data/video_mapping.json')
    .then(response => response.json())
    .then(data => {
        videoMapping = data;
    })
    .catch(error => {
        console.error('Error loading video mapping:', error);
    });

const grammarMapping = { 
    "ฉันไปโรงเรียน": ["โรงเรียน", "ฉัน", "ไป"],    
    "คุณมาทำอะไร": ["ทำ", "อะไร", "มา"],   
    "ฉันอยากได้ความช่วยเหลือ": ["ช่วย", "อยาก"],   
    "คุณมาจากไหน": ["คุณ", "ไหน", "มา"],      
    "กินข้าวหรือยัง": ["ข้าว", "ยัง", "กิน"],       

    "โรงพยาบาลไปทางไหน": ["โรงพยาบาล", "ไหน", "ไป"], 
    "ไปเที่ยวกันไหม": ["เที่ยว", "ไป"],                      
    "ไปตลาดกันไหม": ["ตลาด", "ไป"],                      
    "สิ่งนี้ราคาเท่าไหร่": ["ของ", "เงิน", "เท่าไหร่"],          
    "สวัสดี": ["สวัสดี"],                                  

    "ขอบคุณ": ["ขอบคุณ"],                             
    "คืออะไร": ["อะไร"],                                
    "สบายดีไหม": ["สบายดี", "(เลิกคิ้ว)"],                  
    "ฉันเป็นหมอ": ["หมอ", "ฉัน"],                       
    "คุณทำงานอะไร": ["ทำงาน", "อะไร", "คุณ"],            

    "ฉันเป็นนักเรียน": ["นักเรียน", "ฉัน"],               
    "อยากกินขนม": ["ขนม", "อยาก", "กิน"],            
    "เดินเล่นกันไหม": ["เล่น", "เดิน"],                   
    "ฉันอยากกลับบ้าน": ["ฉัน", "กลับบ้าน", "อยาก"],     
    "เดินไปทางนั้นได้เลย": ["เดิน", "ได้", "ไป"],         

    "ราคาเท่าไหร่": ["เงิน", "เท่าไหร่"],             
    "ขอลองก่อนได้มั้ย": ["ก่อน", "ลอง"],            
    "ลดราคาหน่อยได้มั้ย": ["เงิน", "ลดลง"],          
    "มีบริการส่งของมั้ย": ["ของ", "ส่ง", "มี/ไม่มี"],   
    "รอสักครู่": ["รอ", "นิดเดียว"],                 

    "มีอะไรอย่างอื่นอีกมั้ย": ["เพิ่มเติม", "อะไร"],        
    "ดีใจที่ได้เจอคุณนะ": ["ดีใจ", "พบ", "คุณ"],       
    "ยินดีด้วย": ["ยินดีด้วย"],                          
    "สู้ๆนะ": ["สู้ๆ"],                                
    "ขออันนี้ได้ไหม": ["ขอ"],                        

    "ขึ้นลิฟท์": ["ขึ้นลิฟท์"],           
    "ขึ้นบันได": ["ขึ้นบันได"],         
    "เลี้ยวซ้าย": ["เลี้ยวซ้าย"],        
    "เลี้ยวขวา": ["เลี้ยวขวา"],          
    "เดินตรงไป": ["ตรง", "เดิน"],     

    "ที่ไหน": ["ที่ไหน"],                      
    "คุณสูงเท่าไหร่": ["คุณ", "เท่าไหร่", "สูง"],   
    "ยินดีที่ได้รู้จัก": ["พบ", "ดีใจ"],              
    "คนหูหนวก": ["คนหูหนวก"],                
    "คนหูตึง": ["คนหูตึง"],                     

    "อายุเท่าไหร่": ["อายุเท่าไหร่"],                                 
    "ฉันชอบการเดินทาง": ["ฉัน", "เดินทาง", "ชอบ"],                 
    "ช่วยพาฉันไปตามที่อยู่นี้หน่อย": ["ฉัน", "ที่อยู่", "ช่วย", "พา"],      
    "โปรดระมัดระวังขณะขับรถ": ["ขับรถ", "ระมัดระวัง"],                  
    "จะเอาอันนี้": ["อยาก"],                                     

    "มีประกันหรือเปล่า": ["ประกัน", "มี/ไม่มี"],        
    "ทุกอย่างพร้อมแล้ว": ["พร้อม"],                 
    "มีบางอย่างผิดปกติ": ["แปลก", "มี"],            
    "ห้องน้ำอยู่ที่ไหน": ["ห้องน้ำ", "ไหน"],           
    "มีไวไฟไหม": ["ไวไฟ", "มี/ไม่มี"],              

    "ชั้นที่เท่าไหร่": ["เท่าไหร่", "ชั้น"],        
    // Add more mappings as needed
};

function rearrangeSentence(sentence) {
    let rearrangedWords = [];
    for (let key in grammarMapping) {
        if (sentence.includes(key)) {
            rearrangedWords = rearrangedWords.concat(grammarMapping[key]);
            sentence = sentence.replace(key, "").trim();
        }
    }
    const remainingWords = sentence.split(' '); // Simulated tokenization
    rearrangedWords = rearrangedWords.concat(remainingWords);
    return rearrangedWords;
}

function generateVideoSequence(sentence) {
    const words = rearrangeSentence(sentence);
    const videoSequence = words
        .filter(word => videoMapping[word]) // กรองเฉพาะคำที่มีการแมปใน videoMapping
        .map(word => videoMapping[word]);
    return { videoSequence, words };
}

function playTextAndVideos() {
    const sentence = document.getElementById('sentenceInput').value.trim();
    if (!sentence) {
        alert('กรุณาพิมพ์ข้อความที่ต้องการให้พูด');
        return;
    }

    const { videoSequence, words } = generateVideoSequence(sentence);

    // Text-to-Speech functionality
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = 'th-TH'; // Set the language to Thai
    utterance.rate = 0.6; // ปรับความเร็วการพูด (ค่าต่ำกว่า 1 จะช้าลง)

    const wordsArray = sentence.split(' ');
    let currentIndex = 0;

    utterance.onboundary = (event) => {
        const charIndex = event.charIndex;
        let highlightedText = '';

        wordsArray.forEach((word, index) => {
            if (charIndex >= currentIndex && charIndex < currentIndex + word.length) {
                highlightedText += `<span class="highlighted">${word}</span> `;
            } else {
                highlightedText += `${word} `;
            }
            currentIndex += word.length + 1;
        });

        document.getElementById('highlighted-text').innerHTML = highlightedText.trim();
    };

    utterance.onstart = () => {
        document.getElementById('play-button').style.backgroundColor = 'red';
    };

    utterance.onend = () => {
        document.getElementById('play-button').style.backgroundColor = '';
        document.getElementById('highlighted-text').innerHTML = sentence; // Reset to original text without highlighting
    };

    speechSynthesis.speak(utterance);

    // Video sequence functionality
    playVideosInSingleElement(videoSequence, words);
}

function playVideosInSingleElement(videoSequence, words) {
    const videoElement = document.getElementById('combinedVideo');
    const currentWordElement = document.getElementById('currentWord');
    let currentVideoIndex = 0;

    function playNextVideo() {
        if (currentVideoIndex < videoSequence.length) {
            videoElement.src = `videos/${videoSequence[currentVideoIndex]}`;
            currentWordElement.textContent = `${words[currentVideoIndex]}`;
            videoElement.play();  // เริ่มเล่นวิดีโอ

            currentVideoIndex++;
        }
    }

    videoElement.addEventListener('ended', playNextVideo);

    // เริ่มเล่นวิดีโอแรกในลำดับ
    if (videoSequence.length > 0) {
        playNextVideo();
    }
}

document.getElementById('play-button').addEventListener('click', playTextAndVideos);
