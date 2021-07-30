import styled from 'styled-components';

export const Container = styled.div`
    background: #fff;
    border-radius: 4px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 40px 0;
    margin-top: -140px;

    footer{
        margin-top: 30px;
        display: flex;
        justify-content:space-around;
        align-items: center;
        padding: 0 15px;

        button {
            background: #39b100;
            color: #fff;
            border: 0;
            border-radius: 4px;
            padding: 12px 20px;
            font-weight: bold;
            text-transform: uppercase;
            transition: filter 0.2s;

            &:hover {
                filter: brightness(0.9);
            }
        }
    }
`;

export const ProductTable = styled.table`
    width: 100%;

    thead th {
        color: #999;
        text-align: left;
        padding: 12px;
    }

    tbody td {
        padding: 12px;
        border-bottom: 1px solid #eee;

        &:nth-child(1) {
            display: flex;
        align-items: center;
        justify-content:center;
        }
    }

    img {
        height: 90px;
    }

    strong {
        color: #333;
        display: block;
        font-weight: bold;
    }

    span {
        display: block;
        margin-top: 5px;
        font-size:18px;
        color: #39b100;
    }

    div {
        display: flex;
        align-items: center;

        input {
            border: 1px solid #ddd;
            border-radius: 4px;
            color: #666;
            padding: 6px;
            width: 50px;
        }
    }

    button {
        background: none;
        border:0;
        padding: 6px;
        transition: filter 0.2s;

        svg {
            color: #39b100;
        }

        &:hover {
            filter: brightness(0.8);
        }

        &:disabled {
            cursor: not-allowed;
        }
    }

`

export const Total = styled.div`
    display: flex;
    align-items: center;

    span {
        color: #999;
        font-weight: bold;
    }

    strong{
        font-size: 28px;
        margin-left: 5px;
        color: #39b100;
    }

`
