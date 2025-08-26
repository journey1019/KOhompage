
/**
 * 생년월일 변환 함수
 * '20001010' -> '2000-10-19'
 * */
export const toInputBirth = (yyyymmdd?: string) =>
    yyyymmdd && yyyymmdd.length === 8
        ? `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`
        : '';

export const toPayloadBirth = (yyyy_mm_dd?: string) =>
    yyyy_mm_dd ? yyyy_mm_dd.replaceAll('-', '') : '';

/**
 * 시간 변환 함수
 *
 * */
export const nowKST = () => {
    const now = new Date();
    // 서버가 KST 문자열을 기대한다면 간단히 로컬 시각 기준으로 포맷팅
    const pad = (n: number) => String(n).padStart(2, '0');
    const yyyy = now.getFullYear();
    const MM = pad(now.getMonth() + 1);
    const dd = pad(now.getDate());
    const hh = pad(now.getHours());
    const mm = pad(now.getMinutes());
    const ss = pad(now.getSeconds());
    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
};

/**
 * 한국 전화번호 하이픈 포맷 정규화
 * 문자열로 입력받는 걸 권장함 (선행 0 보존이 중요)
 *
 * 01012345678 -> 010-1234-5678
 * */
export function formatKRPhone(input: string | number): string {
    const originalType = typeof input;

    // 1) 문자열화 + 숫자만 추출
    let digits = String(input).replace(/\D/g, '');

    // 2) number로 들어오면 선행 0이 이미 사라졌을 수 있음: 복원 불가
    //    => 가능하면 string으로 넘기세요.
    if (originalType === 'number' && digits.length <= 10) {
        // 그래도 최대한 안전하게 처리 (그냥 계속 진행)
    }

    // 안전장치: 너무 짧으면 그대로 반환
    if (digits.length < 7) return digits;

    // 3) 분기
    const isSeoul = digits.startsWith('02');
    const threePrefix = digits.slice(0, 3);
    const isMobile = ['010', '011', '016', '017', '018', '019'].includes(threePrefix);

    // ---- 02(서울) 처리 ----
    if (isSeoul) {
        // 9 or 10 total: 02-xxx-xxxx / 02-xxxx-xxxx
        // 02 + 7(=9자리) => 3-4
        // 02 + 8(=10자리) => 4-4
        const body = digits.slice(2); // 02 이후
        if (body.length <= 7) {
            // 예: 02 + 7 -> 3-4
            const mid = body.slice(0, 3);
            const tail = body.slice(3);
            return `02-${mid}-${tail}`;
        } else {
            // 예: 02 + 8 -> 4-4 (그 외 길이도 마지막 8 기준으로 자름)
            const mid = body.slice(0, body.length - 4);
            const tail = body.slice(-4);
            return `02-${mid}-${tail}`;
        }
    }

    // ---- 휴대폰 처리 ----
    if (isMobile) {
        // 10자리면 3-3-4, 11자리면 3-4-4
        if (digits.length === 10) {
            return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
        }
        // 기본(권장) 11자리
        const midLen = digits.length === 11 ? 4 : Math.max(3, digits.length - 7);
        return `${digits.slice(0, 3)}-${digits.slice(3, 3 + midLen)}-${digits.slice(3 + midLen)}`;
    }

    // ---- 기타 지역번호(3자리) 처리 ----
    // 10자리면 3-3-4, 11자리면 3-4-4
    if (digits.length === 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    if (digits.length === 11) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }

    // 그 외 길이(예외): 마지막 4자리를 국번, 앞을 지역/국번으로 유연하게 처리
    return `${digits.slice(0, digits.length - 4)}-${digits.slice(-4)}`;
}


/**
 * === 생년월일 포맷팅 함수 ===
 * '20000101' -> '2000. 01. 01.'
 * */
export function formatBirthDate(input: string | number): string {
    // 1) 문자열화 + 숫자만 추출
    const digits = String(input).replace(/\D/g, "");

    // 2) 자리수 체크 (YYYYMMDD → 8자리)
    if (digits.length !== 8) {
        return input.toString(); // 올바른 형식이 아니면 그대로 반환
    }

    const year = digits.slice(0, 4);
    const month = digits.slice(4, 6).padStart(2, "0");
    const day = digits.slice(6, 8).padStart(2, "0");;

    // 3) 최종 포맷팅
    return `${year}. ${month}. ${day}.`;
}


/**
 * === Format helpers ===
 * */
const onlyDigits = (s?: string) => (s || '').replace(/\D+/g, '');
export function formatPhone(raw?: string) {
    const d = onlyDigits(raw);
    if (d.length === 11) return `${d.slice(0,3)}-${d.slice(3,7)}-${d.slice(7)}`;
    if (d.length === 10) return `${d.slice(0,3)}-${d.slice(3,6)}-${d.slice(6)}`;
    return raw || '';
};