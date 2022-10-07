const fortuneCookies = [
    "언제나 현재에 집중할 수 있다면 행복할 것이다.",
    "절대 어제를 후회하지 마라. 인생은 오늘의 내 안에 있고 내일은 스스로 만드는 것이다.",
    "한 번의 실패와 영원한 실패를 혼동하지 마라.",
    "너무 소심하고 까다롭게 자신의 행동을 고민하지 말라. 모든 인생은 실험이다. 더 많이 실험할수록 더 나아진다.",
    "행복은 습관이다. 그것을 몸에 지녀라",
    "성공해서 만족하는 것은 아니다. 만족하고 있었기 때문에 성공한 것이다."
]

// 모듈 바깥에서 모듈에 있는 내용을 보려면 반드시 exports를 사용해야 합니다.
exports.getFortune = () => {
    const idx = Math.floor(Math.random() * fortuneCookies.length)
    return fortuneCookies[idx]
}