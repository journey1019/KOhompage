export interface JoinRequestBody {
    userId: string;
    userPw: string;
    userNm: string;
    userPrivateDTO: {
        birth: string;
        email: string;
        phone: string;
        telNo: string;
        addressMain: string;
        addressSub: string;
        postalCode: string;
    };
    userAdditionalDTO: {
        termsAgreeYn: "Y" | "N";
        termsAgreeDate: string;
        privateAgreeYn: "Y" | "N";
        privateAgreeDate: string;
        locationAgreeYn: "Y" | "N";
        locationAgreeDate: string;
        exchangeRefundYn: "Y" | "N";
        exchangeRefundDate: string;
    };
}

export async function postJoin(data: JoinRequestBody) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/signin/join", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "회원가입 요청 실패");
    }

    return res.json(); // { success: true, message: "...", etc. }
}

// ID 중복체크
export async function checkUserId(userId: string): Promise<boolean> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin/userIdCheck?userId=${userId}`);
    const data = await res.json();
    return data.status === true; // 사용 가능할 때 true
}

// 계정정보 중복 체크
export async function checkUserInfo(email: string, phone: string): Promise<{ status: boolean; emailUser?: string; phoneUser?: string; }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin/userInfoCheck?email=${email}&phone=${phone}`);
    return res.json();
}