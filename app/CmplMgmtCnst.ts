export class CmplMgmtCnst {

    public static readonly LOGINHASH: string = 'user_login_hash';
    public static readonly USER_LOGOUT: string = 'user_logged_out';
    //

    public static readonly TIMEOUT: number = 15;
    //
    public static readonly SERVER_ERR_TIMEOUT: number = 5000;
    public static readonly HTTP_TIMEOUT: number = 4000;
    public static readonly TIMEOUT_MSG: string = 'দুঃখিত  - এই মুহূর্তে আমরা সার্ভারের সাথে যোগাযোগ করতে পারছিনা। আপনি একটু পরে আবার চেষ্টা করুন';
    //
    // Messages:
    public static readonly OK_MSG: string = 'ঠিক আছে';
    public static readonly SORRY_MSG: string = 'দুঃখিত';
    public static readonly PLEASE_WAIT: string = 'অনুগ্রহ করে একটু অপেক্ষা করুন';
    public static readonly THANKS: string = 'ধন্যবাদ';
    public static readonly DISCARD: string = 'বাতিল করুন';
    //
    public static readonly OTP_RQST_ERR_TITLE: string = 'মোবাইল নং অথবা নাম টাইপ করা নেই';
    public static readonly OTP_RQST_ERR_MSG: string = 'দয়া করে আপনার মোবাইল নং এবং নাম টাইপ করুন ';
    //
    public static readonly WRONG_MOBILE_NUM_TITLE: string = 'ত্রুটিপূর্ণ মোবাইল নম্বর';
    public static readonly WRONG_MOBILE_NUM_MSG: string = 'দয়া করে ১০ সংখ্যার মোবাইল নম্বর টাইপ করুন';
    //
    public static readonly NO_INTERNET_TITLE: string = 'ইন্টারনেট সংযোগ নেই';
    public static readonly NO_INTERNET_MSG: string = 'এই অ্যাপটি ব্যবহার করার জন্য ইন্টারনেট সংযোগ প্রয়োজন । ডিভাইস টি কে ইন্টারনেটে সংযুক্ত করে পুনরায় চালু করুন';
    //
    public static readonly NO_OTP_TYPED: string = 'ও.টি.পি টাইপ করা নেই';
    public static readonly NO_OTP_MSG: string = 'দয়া করে আপনাকে পাঠানো ও.টি.পি টাইপ করে সাবমিট করুন';
    public static readonly OTP_SENDING: string = 'অনুগ্রহ করে অপেক্ষা করুন - আপনাকে ও.টি.পি পাঠানো হচ্ছে';
    public static readonly OTP_SENT_SUCCESS: string = 'একটি এস.এম.এস এর মাধ্যমে আপনাকে ও.টি.পি পাঠানো হয়েছে ';
    public static readonly OTP_SENDING_FAILURE: string = 'আমরা দুঃখিত ! আপনাকে সঠিক ভাবে ও.টি.পি পাঠানো যায়নি। দয়া করে আবার চেষ্টা করুন';
    public static readonly OTP_VERIFICATION_ON: string = 'আপনার ও.টি.পি মিলিয়ে দেখা হচ্ছে - অনুগ্রহ করে অপেক্ষা করুন';
    public static readonly OTP_VERIFICATION_SUCCESS: string = 'অভিনন্দন! আপনার ও.টি.পি পরীক্ষা সম্পূর্ণ হয়েছে';
    public static readonly OTP_VERIFICATION_FAILED: string = 'আমরা দুঃখিত ! আপনার ও.টি.পি পরীক্ষা ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন';
    //
    public static readonly LOGOUT_PROCESS_START: string = 'লগআউট প্রক্রিয়া শুরু হয়েছে - অনুগ্রহ করে অপেক্ষা করুন';
    public static readonly LOGOUT_SUCCESS: string = 'লগআউট প্রক্রিয়া সম্পন্ন হয়েছে। অ্যাপটি পুনরায় ব্যবহারের জন্য লগইন করুন';
    public static readonly LOGOUT_FAILURE: string = 'আমরা দুঃখিত ! লগআউট প্রক্রিয়া ব্যাহত হয়েছে । দয়া করে আবার চেষ্টা করুন';
    // 
    // Complain Page 1 
    public static readonly GENERIC_WHAT_TO_DO_MISSING: string = '"প্রশাসনকে পরামর্শ /তথ্য প্রদান" অথবা  "অভিযোগ দাখিল" - এই দুটির মধ্যে যেকোনো একটির নির্বাচন আবশ্যিক';
    public static readonly GENERIC_COMPLAIN_TYPE_MISSING: string = 'অভিযোগের ধরণ নির্বাচন হয়নি। এটির নির্বাচন আবশ্যিক';
    //
    // Complain Page 2
    public static readonly GENERIC_DATA_MISSING: string = 'প্রতিটি ইনপুটের নির্বাচন আবশ্যিক । ইনপুট নির্বাচন না হলে তথ্য গ্রহণ সম্ভব নয়';
    public static readonly GENERIC_BLOCK_PS_ADDR_MISSING: string = 'ব্লক ও থানা নির্বাচন এবং ঠিকানা জানানো আবশ্যিক';
    public static readonly GENERIC_LANDMARK_MISSING: string = 'ল্যান্ডমার্কের উল্লেখ আবশ্যিক';
    public static readonly GENERIC_PINCODE_ERR: string = 'প্রদেয় পিনকোডটি অবশ্যই ৬ সংখ্যার হতে হবে';
    //
    public static readonly PS_DATA_LOADING: string = 'অনুগ্রহ করে একটু অপেক্ষা করুন । আপনার এলাকাভিত্তিক পুলিশ স্টেশনগুলির তালিকা পাঠানো হচ্ছে';
    public static readonly EMAIL_FORMAT_ERR: string = 'অনুগ্রহ করে ইমেল টি সঠিক ফর্ম্যাটে দিন';
    //
    public static readonly DATA_SUBMIT_MSG: string = 'অনুগ্রহ করে একটু অপেক্ষা করুন। আপনার পাঠানো তথ্য গ্রহণ করা হচ্ছে';
    public static readonly DATA_SUBMIT_SUCCESS: string = 'আপনার তথ্য গ্রহণ করা হয়েছে';
    public static readonly DATA_SUBMIT_ERR: string = 'প্রযুক্তিগত ত্রুটির জন্য আপনার তথ্য নথিভুক্তি সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন';
    //
    public static readonly MODAL_SUCCESS_MSG: string = 'আপনার পাঠানো তথ্য সঠিক ভাবে গৃহীত হয়েছে। নির্দিষ্ট আধিকারিক শীঘ্রই এ ব্যাপারে যথোপযুক্ত ব্যবস্থা নেবেন। আমাদের সাথে পরবর্তী যোগাযোগের সময় নিচের ডকেট নম্বরটি অবশ্যই উল্লেখ করবেন';
    public static readonly MODAL_FAILURE_MSG: string = CmplMgmtCnst.DATA_SUBMIT_ERR;
    //
    public static readonly SUBMISSION_END: string = 'popping_back_to_root';
    //
    public static readonly UPLOADING_IMAGE: string = 'অনুগ্রহ করে অপেক্ষা করুন - ছবিটি আপলোড করা হচ্ছে';
    //
    public static readonly IMG_UPLOAD_RESPONSE: string = 'image_upload_response_captured';  // event string
    //
    public static readonly IMG_UPLOAD_SUCCESS: string = 'আপনার আপলোড করা ছবিটি গৃহীত হয়েছে ।';
    public static readonly IMG_SIZE_EXCEEDED: string = 'ছবিটির সাইজ ২ মেগাবাইটের বেশি হবার জন্য আমরা গ্রহণ করতে পারিনি। অনুগ্রহ করে ২ মেগাবাইটের কম সাইজের ছবি আপলোড করুন';
    public static readonly IMG_UPLOAD_ERROR: string = 'প্রযুক্তিগত ত্রুটির জন্য আপনার আপলোড করা ছবিটি ঠিকমতো গৃহীত হয়নি  - দয়া করে আবার চেষ্টা করুন';

    public static readonly SELECT_PICTURE_SOURCE: string = 'ছবির উৎস নির্বাচন করুন';
    public static readonly WHEN_CAM: string = 'ক্যামেরা';
    public static readonly WHEN_ALBUM: string = 'গ্যালারি';



    //
    public static readonly SUBMIT_COMPLAIN: string = 'অভিযোগ নথিভুক্তিকরণ';
    public static readonly SUBMIT_SUGGESTION: string = 'পরামর্শ প্রদান';
    //public static readonly DEFAULT_HEADER: string = 'পরামর্শ প্রদান / অভিযোগ নথিভুক্তি';
    public static readonly DEFAULT_HEADER: string = 'আপনি যা করতে চান -';
    //
    public static readonly IMAGE_SOURCE_ALBUM: string = 'PHOTOLIBRARY';
    public static readonly IMAGE_SOURCE_CAMERA: string = 'CAMERA';
    //
    public static readonly GENERIC_SUCCESS: boolean = true;
    public static readonly GENERIC_FAILURE: boolean = false;
    //
    public static readonly TAG_LOGIN: string = 'LOGIN';
    public static readonly TAG_OTP: string = 'OTP';
    public static readonly TAG_DELETE_OTP: string = 'DELETE-OTP';
    public static readonly TAG_LOGOUT: string = 'LOGOUT';
    //
    public static readonly TAG_COMPL_TYPE_DEPT_DIST: string = 'COMPTYPE-DEPT-DIST';
    public static readonly TAG_BLOCK: string = 'BLOCK';
    public static readonly TAG_PS: string = 'PS';
    //
    public static readonly TAG_CONTACT: string = 'CONTACT';
    //
    public static readonly TAG_STATUS:string = 'SHOW-COMPLAINT'
    //
    private static readonly CMPL_PORT: string = 'http';
    //private static readonly CMPL_HOST: string = 'demo.infotechsystems.in/citizen';
    private static readonly CMPL_HOST: string = 'apps.paschimmedinipur.gov.in/janasahayak';
    // https://apps.paschimmedinipur.gov.in/janasahayak
    //
    private static readonly Login_Api: string = 'api/login.php'; // serves login+logout+Otp
    ///api/login.php

    private static readonly Data_Api: string = 'api/retrieve-data.php'; // retrieve data in parts

    private static readonly Complain_Submit_Api: string = 'api/insert-data.php'; //

    private static readonly Picture_Submit_Api: string = 'api/upload-image.php';

    private static readonly Complain_Status_Api:string = 'api/retrieve-complaint.php';

    private static readonly Info_Api:string = 'api/retrieve-contact.php';




    public static get BASE_URL(): string {
        let baseUrl = this.CMPL_PORT + '://' + this.CMPL_HOST + '/';
        return baseUrl;
    }
    public static get LOGIN_LOGOUT_OTP_API(): string {
        let url = this.BASE_URL + this.Login_Api;
        //let url = 'assets/assigned-surveys2.json';
        return url;
    }

    public static get RETRIEVE_DATA_API(): string {
        let url = this.BASE_URL + this.Data_Api;
        return url;
    }

    public static get COMPLAIN_SUBMIT_API(): string {
        let url = this.BASE_URL + this.Complain_Submit_Api;
        return url;
    }

    public static get PIC_SUBMIT_API(): string {
        let url = this.BASE_URL + this.Picture_Submit_Api;
        return url;
    }

    public static get COMPLAIN_STATUS_API(): string {
        let url = this.BASE_URL + this.Complain_Status_Api;
        return url;
    }

    public static get INFO_API(): string {
        let url = this.BASE_URL + this.Info_Api;
        return url;
    }

}