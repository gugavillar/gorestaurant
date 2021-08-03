import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 40px 15px;
    margin-top: -140px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 15px;
    background: #FFF;
    border-radius: 4px;

    aside {
        color: #999;
        padding: 16px;
        div.user-data {
            display: flex;
            align-items: center;
            justify-content: space-between;

            button {
                font-weight: 600;
                border-radius: 8px;
                border: 0;
                background:#FFB801;
                color: #FFF;
                display: flex;
                align-items: center;
                transition: filter 0.2s;

                .text {
                    padding: 16px 24px;
                }
            }
        }
    }
    main{
        color: #999;
        max-width: 600px;
        padding: 16px;
        div.info {
            color:#333;
            margin-top: 25px;
        }
        div.address{
            color: #333;
            margin-top: 25px;
            footer{
                display: flex;
                justify-content: right;
                gap: 40px;
                margin-top: 20px;
                button {
                    font-weight: 600;
                    border-radius: 8px;
                    border: 0;
                    background: #39b100;
                    color: #FFF;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    transition: filter 0.2s;

                    .text {
                        padding: 16px 24px;
                    }

                    .icon {
                        display: flex;
                        padding: 16px 16px;
                        margin: 0 auto;
                    }

                    &:hover {
                        filter: brightness(0.8);
                    }
                }
            }
        }
    }

`