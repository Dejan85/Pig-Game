export const createGameHtml = `<div class="piggame__setupGame">
<div class="piggame__create">
    <h1 class="piggame__create--h1"><span>Create</span><span>Game</span></h1>
    <p class="piggame__create--p">Select bets size</p>
    <div class="piggame__create--betsChoices">
        <button data-amount="1/2">1 / 2</button>
        <button data-amount="2x">2x</button>
        <button data-amount="min">min</button>
        <button data-amount="max">max</button>
    </div>
    <div class="piggame__create--input">
        <p id="betsDecrease">-</p>
        <input id="input__value" value="200">
        <p id="betsIncrease">+</p>
    </div>
    <div class="piggame__create--btn">
        <button id="selectAccountBtn">Select Account</button>
    </div>

</div>
<div class="piggame__account">
    <h2 class="piggame__account--h2">
        Account
    </h2>
    <p class="piggame__account--name">Name</p>
    <div class="piggame__account--list">
    <div id="accountList"></div>
    <div class="piggame__account--addorremove"><span id="addAccountBtn">+</span></div>
    </div>
</div>
<div class="piggame__amount">
    <h2 class="piggame__account--h2">
        Total Budget
    </h2>
    <div class="piggame__amount--name">
        <p>Valute</p>
        <p>Amount</p>
    </div>
    <div class="piggame__amount--list" id="totalBudgetList">
      
    </div>
</div>
<div class="piggame__history">
    <h2 class="piggame__account--h2">
        History
    </h2>
    <div class="piggame__history--name">
        <p>Date</p>
        <p>Win</p>
        <p>Lose</p>
    </div>
    <div class="piggame__history--list" id="historyList">
        <div class="piggame__history--date">
            <p>27. 11. 2019.</p>
            <p>300</p>
            <p>0</p>
        </div>
        <div class="piggame__history--date">
            <p>27. 11. 2019.</p>
            <p>300</p>
            <p>0</p>
        </div>
        <div class="piggame__history--date">
            <p>27. 11. 2019.</p>
            <p>0</p>
            <p>1200</p>
        </div>
        <div class="piggame__history--date">
            <p>27. 11. 2019.</p>
            <p>300</p>
            <p>0</p>
        </div>
    </div>

</div>
</div>`;

export const gamePlayHtml = `<div class="piggame__container">
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
            <p class="piggame__score--point" id="playerScore">0</p>
        </div>
        <div class="piggame__current">
            <p class="piggame__current--name" id="playerCurrent">0</p>
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
            <p class="piggame__score--point" id="rivalScore">0</p>
        </div>
        <div class="piggame__current">
            <p class="piggame__current--name" id="rivalCurrent">0</p>
            <p class="piggame__current--point">current</p>
        </div>
    </div>
</div>
</div>`;
