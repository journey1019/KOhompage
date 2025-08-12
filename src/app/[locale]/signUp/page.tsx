'use client';

import { useState } from 'react';
import InputField from '@/components/common/InputField';
import CheckboxField from '@/components/common/CheckboxField';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { SignUp, CheckUserId, CheckUserInfo } from '@/lib/api/authApi';

const toYN = (val: boolean): "Y" | "N" => (val ? "Y" : "N");

export default function SignUpPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        userId: '',
        password: '',
        passwordConfirm: '',
        name: '',
        birthDate: '',
        email: '',
        phone: '',
        telNo: '',
        postalCode: '',
        addressMain: '',
        addressSub: '',
        agreeAll: false,
        agree1: false,
        agree2: false,
        agree3: false,
    });

    const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleAgreeAll = () => {
        const newValue = !form.agreeAll;
        setForm((prev) => ({
            ...prev,
            agreeAll: newValue,
            agree1: newValue,
            agree2: newValue,
            agree3: newValue,
        }));
    };

    console.log(form)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 비밀번호 확인 체크
        if (form.password !== form.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 필수 약관 체크
        if (!form.agree1 || !form.agree2) {
            alert("필수 약관에 동의해주세요.");
            return;
        }

        // ID 중복 체크
        const isUserIdAvailable = await CheckUserId(form.userId);
        if (!isUserIdAvailable) {
            alert("이미 사용 중인 아이디입니다.");
            return;
        }

        // 이메일/휴대폰 중복 체크
        const userInfoCheck = await CheckUserInfo(form.email, form.phone);
        if (!userInfoCheck.status) {
            const matched = [];
            if (userInfoCheck.emailUser) matched.push(`이메일 유사: ${userInfoCheck.emailUser}`);
            if (userInfoCheck.phoneUser) matched.push(`휴대폰 유사: ${userInfoCheck.phoneUser}`);
            alert(`이미 등록된 계정 정보입니다.\n${matched.join('\n')}`);
            return;
        }
        
        const today = new Date().toISOString().slice(0, 19).replace("T", " "); // YYYY-MM-DD hh:mm:ss

        const payload = {
            userId: form.userId,
            userPw: form.password,
            userNm: form.name,
            userPrivateDTO: {
                birth: form.birthDate.replaceAll("-", ""),
                email: form.email,
                phone: form.phone,
                telNo: form.telNo,
                addressMain: form.addressMain,
                addressSub: form.addressSub,
                postalCode: form.postalCode,
            },
            userAdditionalDTO: {
                termsAgreeYn: toYN(form.agree1),
                termsAgreeDate: today,
                privateAgreeYn: toYN(form.agree2),
                privateAgreeDate: today,
                locationAgreeYn: toYN(form.agree3),
                locationAgreeDate: today,
                exchangeRefundYn: "Y", // 또는 명시적으로 타입 선언
                exchangeRefundDate: today,
            },
        };
        console.log(payload)

        try {
            const res = await SignUp(payload);
            console.log(res);
            alert("회원가입이 완료되었습니다.");
            router.push("/ko/login"); // or your login page
        } catch (error: any) {
            console.error("회원가입 실패", error);
            alert("회원가입 실패: " + error.message);
        }
    };


    /**
     * 동적 import + SSR 비활성화
     * AddressSearchButton이 CSR로만 렌더링되어 Hydration 에러 방지 가능
     * */
    const AddressSearchButton = dynamic(() => import('@/components/common/AddressSearchButton'), {
        ssr: false,
    });

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-xl space-y-6">
                <div className="flex justify-center mb-6">
                    <Image src="/images/KO_SmallLogo.png" alt="Logo" width={150} height={100} unoptimized />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800">회원가입</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 계정 정보 */}
                    <InputField id="userId" label="아이디" value={form.userId} onChange={handleChange('userId')}
                                required />
                    <InputField id="password" label="비밀번호" type="password" value={form.password}
                                onChange={handleChange('password')} required />
                    <InputField id="passwordConfirm" label="비밀번호 확인" type="password" value={form.passwordConfirm}
                                onChange={handleChange('passwordConfirm')} required />

                    {/* 개인정보 */}
                    <InputField id="name" label="이름" value={form.name} onChange={handleChange('name')} required />
                    <InputField id="birthDate" label="생년월일" type="date" value={form.birthDate}
                                onChange={handleChange('birthDate')} required />
                    <InputField id="email" label="이메일" type="email" value={form.email} onChange={handleChange('email')}
                                required />
                    <InputField id="phone" label="휴대폰 번호" value={form.phone} onChange={handleChange('phone')}
                                required />
                    <InputField id="telNo" label="전화번호 (선택)" value={form.telNo} onChange={handleChange('telNo')} />

                    {/* 주소 영역 */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1">
                            <InputField
                                id="postalCode"
                                label="우편번호"
                                value={form.postalCode}
                                onChange={handleChange('postalCode')}
                                required
                            />
                        </div>
                        <AddressSearchButton
                            onComplete={({ postalCode, addressMain }) => {
                                setForm((prev) => ({
                                    ...prev,
                                    postalCode,
                                    addressMain,
                                }));
                            }}
                        />
                    </div>


                    <InputField
                        id="addressMain"
                        label="기본주소"
                        value={form.addressMain}
                        onChange={handleChange('addressMain')}
                        required
                    />

                    <InputField
                        id="addressSub"
                        label="상세주소"
                        value={form.addressSub}
                        onChange={handleChange('addressSub')}
                        required
                    />


                    {/* 약관 */}
                    <div className="border-t pt-4 space-y-2">
                        <CheckboxField id="agreeAll" label="전체 동의" checked={form.agreeAll} onChange={handleAgreeAll} />
                        <CheckboxField id="agree1" label="[필수] 이용약관 동의" checked={form.agree1}
                                       onChange={handleChange('agree1')} required />
                        <CheckboxField id="agree2" label="[필수] 개인정보 처리방침 동의" checked={form.agree2}
                                       onChange={handleChange('agree2')} required />
                        <CheckboxField id="agree3" label="[선택] 마케팅 수신 동의" checked={form.agree3}
                                       onChange={handleChange('agree3')} />
                    </div>

                    {/* 제출 */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:bg-gray-400"
                        disabled={!form.userId || !form.password || !form.passwordConfirm || !form.agree1 || !form.agree2}
                    >
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}
