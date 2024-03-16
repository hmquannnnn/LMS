export const ShareIcon = (props) => (
    <div className="border bg-black w-min px-1.5 py-1.5 rounded-full hover:shadow-md ease-in-out transition-shadow duration-250 cursor-pointer">
        {/* <svg
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            overflow="hidden"
            {...props}
        >
            <g transform="translate(-592 -312)">
                <path d="M674.9 351.1C674.6 351.1 674.3 351.1 674 351.1L671.4 344.1C677.4 340.7 679.5 333.1 676.2 327.1 672.8 321.1 665.2 319 659.2 322.3 656.3 323.9 654.1 326.7 653.3 329.9L644 328.9C643.3 324.5 639.2 321.4 634.8 322.1 630.8 322.7 627.9 326.1 627.9 330.1 627.9 331.5 628.3 332.9 629 334.2L617.8 345.2C615.7 343.6 613.1 342.7 610.4 342.7 603.5 342.7 597.9 348.3 597.9 355.2 597.9 362.1 603.5 367.7 610.4 367.7L612.9 382.7C608.8 384.5 606.9 389.3 608.7 393.4 610.5 397.5 615.3 399.4 619.4 397.6 623.2 396 625.1 391.8 624 387.8L632.8 383.2C638.5 389.5 648.3 390 654.7 384.3 657.9 381.4 659.8 377.2 659.8 372.9 659.8 371.8 659.7 370.6 659.4 369.5L669.1 364.5C672.1 367.9 677.2 368.2 680.6 365.2 684 362.2 684.3 357.1 681.3 353.7 679.4 352.1 677.2 351.1 674.9 351.1L674.9 351.1ZM674.9 354.1C676.2 354.1 677.2 355.1 677.2 356.4 677.2 357.7 676.2 358.7 674.9 358.7 673.6 358.7 672.6 357.7 672.6 356.4 672.6 356.4 672.6 356.4 672.6 356.4 672.6 355.1 673.6 354.1 674.9 354.1L674.9 354.1ZM665.3 325.6C667.2 325.6 668.8 327.2 668.8 329.1 668.8 331 667.2 332.6 665.3 332.6 663.4 332.6 661.8 331 661.8 329.1 661.8 329.1 661.8 329.1 661.8 329.1 661.8 327.2 663.3 325.6 665.3 325.6ZM658.2 337C658.2 336.5 658.5 335.9 658.9 335.6 659.9 334.9 661.1 334.3 662.3 334 663.2 333.7 664.2 333.6 665.2 333.6 666.2 333.6 667.2 333.8 668.1 334 669.3 334.3 670.5 334.9 671.5 335.7 671.9 336 672.2 336.6 672.2 337.1L672.2 339.8 658.2 339.8 658.2 337ZM635.9 325C637.2 325 638.2 326 638.2 327.3 638.2 328.6 637.2 329.6 635.9 329.6 634.6 329.6 633.6 328.6 633.6 327.3 633.6 327.3 633.6 327.3 633.6 327.3 633.6 326.1 634.6 325 635.9 325L635.9 325ZM631.2 332.5C631.2 332.1 631.4 331.8 631.7 331.6 632.4 331.1 633.2 330.8 634 330.6 634.6 330.4 635.3 330.3 635.9 330.3 636.5 330.3 637.2 330.4 637.8 330.6 638.6 330.8 639.3 331.2 640 331.7 640.3 331.9 640.5 332.3 640.5 332.6L640.5 334.4 631.3 334.4 631.3 332.5ZM610.2 347.6C612.1 347.6 613.7 349.2 613.7 351.1 613.7 353 612.1 354.6 610.2 354.6 608.3 354.6 606.7 353 606.7 351.1 606.7 351.1 606.7 351.1 606.7 351.1 606.8 349.2 608.3 347.6 610.2 347.6L610.2 347.6ZM603.2 361.7 603.2 359C603.2 358.5 603.5 357.9 603.9 357.6 604.9 356.9 606.1 356.3 607.3 356 608.2 355.7 609.2 355.6 610.2 355.6 611.2 355.6 612.2 355.8 613.1 356 614.3 356.3 615.5 356.9 616.5 357.7 616.9 358 617.2 358.6 617.2 359.1L617.2 361.8 603.2 361.7ZM620.5 394.3 611.2 394.3 611.2 392.5C611.2 392.1 611.4 391.8 611.7 391.6 612.4 391.1 613.2 390.7 614 390.5 614.6 390.3 615.3 390.2 615.9 390.2 616.5 390.2 617.2 390.3 617.8 390.5 618.6 390.7 619.3 391.1 620 391.6 620.3 391.8 620.5 392.2 620.5 392.5L620.5 394.3ZM613.5 387.3C613.5 386 614.5 385 615.8 385 617.1 385 618.1 386 618.1 387.3 618.1 388.6 617.1 389.6 615.8 389.6 614.6 389.7 613.6 388.6 613.5 387.3L613.5 387.3ZM621.5 384.5C620.2 383.2 618.4 382.4 616.6 382.2L614.1 367.2C616.5 366.4 618.6 364.9 620.1 362.9L629.4 367.8C627.9 371.8 628.2 376.3 630.2 380.1L621.5 384.5ZM631.3 364.1 622.1 359.3C622.5 358 622.7 356.7 622.7 355.3 622.7 352.7 621.9 350.2 620.4 348.1L631.6 337.2C635.4 339.5 640.4 338.4 642.7 334.6 643 334.1 643.2 333.6 643.4 333.1L652.7 334.1C652.9 337.7 654.7 341.1 657.6 343.3L649.4 358.6C642.9 356 635.4 358.3 631.3 364.1L631.3 364.1ZM648.3 367.8C648.3 370.2 646.3 372.1 643.9 372.1 641.5 372.1 639.6 370.2 639.6 367.8 639.6 365.4 641.5 363.5 643.9 363.5 643.9 363.5 643.9 363.5 644 363.5 646.4 363.5 648.3 365.4 648.3 367.8L648.3 367.8ZM652.6 380.9 635.3 380.9 635.3 377.6C635.3 376.9 635.6 376.3 636.2 375.9 637.5 375 638.9 374.3 640.4 373.8 641.6 373.5 642.8 373.3 644 373.3 645.2 373.3 646.4 373.5 647.6 373.8 649.1 374.2 650.6 374.9 651.8 375.9 652.3 376.3 652.7 377 652.7 377.6L652.6 380.9ZM666.8 359.3C666.8 359.9 666.9 360.5 667.1 361.1L657.9 365.9C656.8 363.7 655.1 361.9 653.1 360.5L661.3 345.2C662.6 345.7 664 345.9 665.4 345.9 666.2 345.9 667 345.8 667.8 345.7L670.4 352.7C668 354.1 666.7 356.6 666.8 359.3ZM679.5 363.3 670.2 363.3 670.2 361.5C670.2 361.1 670.4 360.8 670.7 360.6 671.4 360.1 672.2 359.7 673 359.5 673.6 359.3 674.3 359.2 674.9 359.2 675.5 359.2 676.2 359.3 676.8 359.5 677.6 359.7 678.3 360.1 679 360.6 679.3 360.8 679.5 361.2 679.5 361.5L679.5 363.3Z" /></g></svg>
     */}
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" {...props} overflow="hidden"><g transform="translate(-592 -312)"><path d="M609.271 320.146C609.208 320.146 609.146 320.146 609.083 320.146L608.542 318.688C609.792 317.979 610.229 316.396 609.542 315.146 608.833 313.896 607.25 313.458 606 314.146 605.396 314.479 604.938 315.062 604.771 315.729L602.833 315.521C602.688 314.604 601.833 313.958 600.917 314.104 600.083 314.229 599.479 314.938 599.479 315.771 599.479 316.062 599.562 316.354 599.708 316.625L597.375 318.917C596.938 318.583 596.396 318.396 595.833 318.396 594.396 318.396 593.229 319.562 593.229 321 593.229 322.438 594.396 323.604 595.833 323.604L596.354 326.729C595.5 327.104 595.104 328.104 595.479 328.958 595.854 329.812 596.854 330.208 597.708 329.833 598.5 329.5 598.896 328.625 598.667 327.792L600.5 326.833C601.688 328.146 603.729 328.25 605.062 327.062 605.729 326.458 606.125 325.583 606.125 324.688 606.125 324.458 606.104 324.208 606.042 323.979L608.062 322.938C608.688 323.646 609.75 323.708 610.458 323.083 611.167 322.458 611.229 321.396 610.604 320.688 610.208 320.354 609.75 320.146 609.271 320.146L609.271 320.146ZM609.271 320.771C609.542 320.771 609.75 320.979 609.75 321.25 609.75 321.521 609.542 321.729 609.271 321.729 609 321.729 608.792 321.521 608.792 321.25 608.792 321.25 608.792 321.25 608.792 321.25 608.792 320.979 609 320.771 609.271 320.771L609.271 320.771ZM607.271 314.833C607.667 314.833 608 315.167 608 315.562 608 315.958 607.667 316.292 607.271 316.292 606.875 316.292 606.542 315.958 606.542 315.562 606.542 315.562 606.542 315.562 606.542 315.562 606.542 315.167 606.854 314.833 607.271 314.833ZM605.792 317.208C605.792 317.104 605.854 316.979 605.938 316.917 606.146 316.771 606.396 316.646 606.646 316.583 606.833 316.521 607.042 316.5 607.25 316.5 607.458 316.5 607.667 316.542 607.854 316.583 608.104 316.646 608.354 316.771 608.562 316.938 608.646 317 608.708 317.125 608.708 317.229L608.708 317.792 605.792 317.792 605.792 317.208ZM601.146 314.708C601.417 314.708 601.625 314.917 601.625 315.188 601.625 315.458 601.417 315.667 601.146 315.667 600.875 315.667 600.667 315.458 600.667 315.188 600.667 315.188 600.667 315.188 600.667 315.188 600.667 314.938 600.875 314.708 601.146 314.708L601.146 314.708ZM600.167 316.271C600.167 316.188 600.208 316.125 600.271 316.083 600.417 315.979 600.583 315.917 600.75 315.875 600.875 315.833 601.021 315.812 601.146 315.812 601.271 315.812 601.417 315.833 601.542 315.875 601.708 315.917 601.854 316 602 316.104 602.062 316.146 602.104 316.229 602.104 316.292L602.104 316.667 600.188 316.667 600.188 316.271ZM595.792 319.417C596.188 319.417 596.521 319.75 596.521 320.146 596.521 320.542 596.188 320.875 595.792 320.875 595.396 320.875 595.062 320.542 595.062 320.146 595.062 320.146 595.062 320.146 595.062 320.146 595.083 319.75 595.396 319.417 595.792 319.417L595.792 319.417ZM594.333 322.354 594.333 321.792C594.333 321.688 594.396 321.562 594.479 321.5 594.688 321.354 594.938 321.229 595.188 321.167 595.375 321.104 595.583 321.083 595.792 321.083 596 321.083 596.208 321.125 596.396 321.167 596.646 321.229 596.896 321.354 597.104 321.521 597.188 321.583 597.25 321.708 597.25 321.812L597.25 322.375 594.333 322.354ZM597.938 329.146 596 329.146 596 328.771C596 328.688 596.042 328.625 596.104 328.583 596.25 328.479 596.417 328.396 596.583 328.354 596.708 328.312 596.854 328.292 596.979 328.292 597.104 328.292 597.25 328.312 597.375 328.354 597.542 328.396 597.688 328.479 597.833 328.583 597.896 328.625 597.938 328.708 597.938 328.771L597.938 329.146ZM596.479 327.688C596.479 327.417 596.688 327.208 596.958 327.208 597.229 327.208 597.438 327.417 597.438 327.688 597.438 327.958 597.229 328.167 596.958 328.167 596.708 328.188 596.5 327.958 596.479 327.688L596.479 327.688ZM598.146 327.104C597.875 326.833 597.5 326.667 597.125 326.625L596.604 323.5C597.104 323.333 597.542 323.021 597.854 322.604L599.792 323.625C599.479 324.458 599.542 325.396 599.958 326.188L598.146 327.104ZM600.188 322.854 598.271 321.854C598.354 321.583 598.396 321.312 598.396 321.021 598.396 320.479 598.229 319.958 597.917 319.521L600.25 317.25C601.042 317.729 602.083 317.5 602.562 316.708 602.625 316.604 602.667 316.5 602.708 316.396L604.646 316.604C604.688 317.354 605.062 318.062 605.667 318.521L603.958 321.708C602.604 321.167 601.042 321.646 600.188 322.854L600.188 322.854ZM603.729 323.625C603.729 324.125 603.312 324.521 602.812 324.521 602.312 324.521 601.917 324.125 601.917 323.625 601.917 323.125 602.312 322.729 602.812 322.729 602.812 322.729 602.812 322.729 602.833 322.729 603.333 322.729 603.729 323.125 603.729 323.625L603.729 323.625ZM604.625 326.354 601.021 326.354 601.021 325.667C601.021 325.521 601.083 325.396 601.208 325.312 601.479 325.125 601.771 324.979 602.083 324.875 602.333 324.812 602.583 324.771 602.833 324.771 603.083 324.771 603.333 324.812 603.583 324.875 603.896 324.958 604.208 325.104 604.458 325.312 604.562 325.396 604.646 325.542 604.646 325.667L604.625 326.354ZM607.583 321.854C607.583 321.979 607.604 322.104 607.646 322.229L605.729 323.229C605.5 322.771 605.146 322.396 604.729 322.104L606.438 318.917C606.708 319.021 607 319.062 607.292 319.062 607.458 319.062 607.625 319.042 607.792 319.021L608.333 320.479C607.833 320.771 607.562 321.292 607.583 321.854ZM610.229 322.688 608.292 322.688 608.292 322.312C608.292 322.229 608.333 322.167 608.396 322.125 608.542 322.021 608.708 321.938 608.875 321.896 609 321.854 609.146 321.833 609.271 321.833 609.396 321.833 609.542 321.854 609.667 321.896 609.833 321.938 609.979 322.021 610.125 322.125 610.188 322.167 610.229 322.25 610.229 322.312L610.229 322.688Z" fill="#FFFFFF" /></g></svg>
    </div>
);

export const PracticeIcon = (props) => (
    <div className="border flex justify-center bg-black w-min px-2 py-2 rounded-full hover:shadow-md ease-in-out transition-shadow duration-250 cursor-pointer">
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" {...props} overflow="hidden"><g transform="translate(-592 -312)"><path d="M596.167 323.85C596.5 324.183 596.5 324.7 596.167 325.033L594.75 325.5 594.5 325.25 594.967 323.833C595.317 323.517 595.833 323.517 596.167 323.85ZM602.717 315.15 594.383 323.5 593.333 326.667 596.517 325.617 604.85 317.283" fill="#FFFFFF" /><path d="M606.483 314.7 605.3 313.517C605.033 313.25 604.617 313.25 604.35 313.517L603.183 314.683 605.3 316.8 606.467 315.633C606.75 315.383 606.75 314.967 606.483 314.7Z" fill="#FFFFFF" /></g></svg></div>
);



export const HeartUnLikeIcon = (props) => (
    <div className="rounded-full bg-white max-w-[36px] min-w-[36px] max-h-[36px] min-h-[36px] items-center  flex justify-center hover:shadow-md ease-in-out transition-shadow duration-250 cursor-pointer">
        <svg
            aria-label="Unlike"
            className="x1lliihq x1n2onr6 xxk16z8"
            fill="#ff3041"
            height="24"
            role="img"
            viewBox="0 0 48 48"
            width="24"
            {...props}
        >
            <title>Unlike</title>
            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
        </svg>
    </div>
);

export const HeartLikeIcon = (props) => (
    <button className=" rounded-full bg-white max-w-[36px] min-w-[36px] max-h-[36px] min-h-[36px] items-center  flex justify-center hover:shadow-md ease-in-out transition-shadow duration-250 cursor-pointer">
        <svg fill="#000000" width="24"
            height="24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"></path> </g></svg>
    </button>
);