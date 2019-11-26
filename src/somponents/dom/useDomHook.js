const useDomHook = function() {
	function Dom(piggame) {
		this.piggame = piggame;
	}

	Dom.prototype.gamePlayDom = function() {
		const html = `<div class="piggame__container">
        <div class="piggame__header">
            <div class="piggame__btns">
                <button class="piggame__btns--rolldice">Roll Dice!</button>
                <button class="piggame__btns--hold">Hold</button>
            </div>

            <div class="piggame__value">
                <p class="piggame__value--info">50 To Win</p>
                <p class="piggame__value--info">Winning Value</p>
                <p class="piggame__value--info">Get >= Scope to Win!</p>
            </div>

            <div class="piggame__info">
                <div class="piggame__info--limit">
                    <div class="piggame__info--firstnumber">
                        <p>0</p>
                    </div>
                    <div class="piggame__info--secondnumber">
                        <p>0</p>
                    </div>
                    <div class="piggame__info--firstnumber">
                        <p>4</p>
                    </div>
                    <div class="piggame__info--secondnumber">
                        <p>2</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="piggame__body">
            <div class="piggame__player">
                <div class="piggame__score">
                    <p class="piggame__score--name">You</p>
                    <p class="piggame__score--point">0</p>
                </div>
                <div class="piggame__current">
                    <p class="piggame__current--name">0</p>
                    <p class="piggame__current--point">current</p>
                </div>

            </div>
            <div class="piggame__dice">
                <div class="piggame__dice--cube">
                    <div class="piggame__dice--face">1</div>
                    <div class="piggame__dice--face">2</div>
                    <div class="piggame__dice--face">3</div>
                    <div class="piggame__dice--face">4</div>
                    <div class="piggame__dice--face">5</div>
                    <div class="piggame__dice--face">6</div>
                </div>
                <div class="piggame__dice--cube">
                    <div class="piggame__dice--face">1</div>
                    <div class="piggame__dice--face">2</div>
                    <div class="piggame__dice--face">3</div>
                    <div class="piggame__dice--face">4</div>
                    <div class="piggame__dice--face">5</div>
                    <div class="piggame__dice--face">6</div>
                </div>
            </div>
            <div class="piggame__player">
                <div class="piggame__score">
                    <p class="piggame__score--name">Rival</p>
                    <p class="piggame__score--point">0</p>
                </div>
                <div class="piggame__current">
                    <p class="piggame__current--name">0</p>
                    <p class="piggame__current--point">current</p>
                </div>
            </div>
        </div>
    </div>`;

		this.piggame.innerHTML = html;
	};

	Dom.prototype.rolldiceBtn = function() {
		return document.querySelector('.piggame__btns--rolldice');
	};

	const dom = new Dom(document.querySelector('.piggame'));

	return { dom };
};

export default useDomHook;
