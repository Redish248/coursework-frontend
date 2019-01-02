import React, { Component } from "react";
import UserNavigation from "./UserNavigation";


export default class UserLK extends Component {
    render() {
        return(
            <div>
                <UserNavigation/>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <img src="../../public/icon.ico"/>
                            <p>Ник: </p>
                        </td>
                        <td>
                            <table>
                                <thead>Данные о пользователе:</thead>
                                <tbody>
                                <tr>
                                    <td>Имя:</td>
                                    <td>{this.props.name}</td>
                                </tr>
                                <tr>
                                    <td>Фамилия:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Пол:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Дата рождения:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Рост:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Вес:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Дистрикт:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Статус:</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <p>Мои навыки:</p>
                            Datatable
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Ближайшие игры и тренировки:</p>
                            Календарь
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}