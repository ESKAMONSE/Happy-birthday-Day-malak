document.addEventListener('DOMContentLoaded', () => {
    const heart = document.querySelector('.heart');
    const myAudio = document.getElementById('myAudio');
    const anasSpreadContainer = document.getElementById('anas-spread-container');
    const footerElement = document.querySelector('.footer'); // بنجيب عنصر الـ footer

    // **ملاحظة هامة:** استبدل 'malak.jpg' بمسار الصورة الصحيح.
    const imageToDisplayPath = 'malak.jpg'; // تأكد أن هذا هو المسار الصحيح لصورتك

    // دالة لتشغيل الصورة ونشر كلمة "أنس"
    const handleHeartClick = () => {
        // 1. عرض الصورة
        let img = document.createElement('img');
        img.src = imageToDisplayPath;
        
        // --- التعديل هنا لظهور الصورة تحت الـ footer ---
        img.style.position = 'absolute'; // عشان نقدر نتحكم في مكانها بالـ top و left
        if (footerElement) { // نتأكد إن عنصر الـ footer موجود
            const footerRect = footerElement.getBoundingClientRect(); // بنجيب أبعاد ومكان الـ footer
            img.style.top = `${footerRect.bottom + 20}px`; // هتظهر تحت الـ footer بـ 20 بكسل مسافة
            img.style.left = `${footerRect.left + (footerRect.width / 2)}px`; // في نص الـ footer أفقيًا
            img.style.transform = 'translateX(-50%)'; // عشان تتسنتر بالظبط بالنسبة لنقطة الـ left
        } else {
            // لو الـ footer مش موجود لسبب ما، هتظهر في نص الشاشة كبديل
            img.style.top = '50%';
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -50%)';
            console.warn("عنصر الـ footer (class='footer') لم يتم العثور عليه، الصورة ستظهر في منتصف الشاشة.");
        }
        // --- نهاية التعديل ---

        img.style.maxWidth = '80%';
        img.style.height = 'auto';
        img.style.zIndex = '1000';
        img.style.borderRadius = '10px';
        img.style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
        document.body.appendChild(img);

        // إزالة الصورة بعد 5 ثواني
        setTimeout(() => {
            img.remove();
        }, 5000);

        // 2. تشغيل الأغنية
        if (myAudio) {
            myAudio.play();
        }

        // 3. نشر كلمة "أنس" (هذا الجزء كما هو)
        const numberOfWords = 30;
        anasSpreadContainer.innerHTML = '';

        for (let i = 0; i < numberOfWords; i++) {
            let anasWord = document.createElement('div');
            anasWord.classList.add('anas-word');
            anasWord.textContent = 'أنس';

            let startX = Math.random() * window.innerWidth;
            let startY = Math.random() * window.innerHeight;

            anasWord.style.left = `${startX}px`;
            anasWord.style.top = `${startY}px`;

            anasSpreadContainer.appendChild(anasWord);

            setTimeout(() => {
                anasWord.style.opacity = 1;
                anasWord.style.transform = 'scale(1)';

                const endOffsetX = (Math.random() * 2 - 1) * window.innerWidth * 0.7;
                const endOffsetY = (Math.random() * 2 - 1) * window.innerHeight * 0.7;
                const duration = Math.random() * 3 + 2;

                anasWord.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out, left ${duration}s ease-out, top ${duration}s ease-out`;
                anasWord.style.left = `${startX + endOffsetX}px`;
                anasWord.style.top = `${startY + endOffsetY}px`;
                anasWord.style.opacity = 0;
                anasWord.style.transform = `scale(0.5) rotate(${Math.random() * 720 - 360}deg)`;
            }, 50 * i);

            setTimeout(() => {
                anasWord.remove();
            }, (50 * i) + (duration * 1000) + 500);
        }
    };

    // ربط الدالة بحدث النقر على القلب
    if (heart) {
        heart.addEventListener('click', handleHeartClick);
    } else {
        console.error("عنصر القلب (class='heart') لم يتم العثور عليه في HTML.");
    }
});
