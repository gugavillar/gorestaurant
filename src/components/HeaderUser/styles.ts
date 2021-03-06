import styled from 'styled-components';

export const Container = styled.div`
  background: #c72828;
  padding: 30px 0;

  header {
    width: 1280px;
    margin: 0 auto;
    padding: 0 0 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;
      align-items: center;
      gap: 15px;
      div {
        a {
          text-decoration: none;
        }
        button {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          background: #39b100;
          color: #fff;

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
            background: #41c900;
            border-radius: 0 8px 8px 0;
            margin: 0 auto;
          }

          &:hover {
            filter: brightness(0.8);
          }
        }
      }
      div.user{
        display:grid;
        justify-items: center;
        cursor: pointer;
        img {
          clip-path: circle();
          width: 50%;
          margin-bottom: 5px;
        }
      }
    }
  }
`;
