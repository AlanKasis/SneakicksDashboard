import React, { useState, useEffect } from 'react'
import '../Dashboard.css'
import DataCard from '../components/DataCard';
import LastCreatedCard from '../components/LastCreatedCard';
import MainNavbar from "../components/MainNavbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Spinner from 'react-bootstrap/Spinner';

const DashboardPage = () => {

    const [users, setUsers] = useState([])
    const [lastCreatedUser, setLastCreatedUser] = useState()
    const [products, setProducts] = useState([])
    const [lastCreatedProduct, setLastCreatedProduct] = useState()
    const [isUsersLoading, setIsUsersLoading] = useState(true)
    const [isProductsLoading, setIsProductsLoading] = useState(true)
    const [isLastCreatedUserLoading, setIsLastCreatedUserLoading] = useState(true)
    const [isLastCreatedProductLoading, setIsLastCreatedProductLoading] = useState(true)
    const [isAllLoading, setIsAllLoading] = useState(true)

    const usersUrl = `http://localhost:3000/api/users`;
    const productsUrl = `http://localhost:3000/api/products`;

    const getUsers = () => {
        fetch(usersUrl)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setUsers(data)
            })
            .finally(() =>
                setIsUsersLoading(false)
            )
    }

    const getLastCreatedUser = (users) => {
        if (!isUsersLoading) {
            const lastCreatedUser = users.users.filter(user => {
                return user.id === users.count;
            })

            fetch(lastCreatedUser[0].detail)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setLastCreatedUser(data)
                })
                .finally(() =>
                    setIsLastCreatedUserLoading(false)
                )
        }
    }

    const getProducts = () => {
        fetch(productsUrl)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setProducts(data)
            })
            .finally(() =>
                setIsProductsLoading(false)
            )
    }

    const getLastCreatedProduct = (products) => {
        if (!isProductsLoading) {
            const lastCreatedProductId = Math.max(...products.products.map(product => product.id))

            console.log(lastCreatedProductId)

            fetch(`http://localhost:3000/api/products/${lastCreatedProductId}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setLastCreatedProduct(data)
                })
                .finally(() =>
                    setIsLastCreatedProductLoading(false)
                )
        }
    }

    useEffect(() => {
        if (isUsersLoading) {
            getUsers();
        } else {
            getLastCreatedUser(users);
        }
    }, [users])

    useEffect(() => {
        if (isProductsLoading) {
            getProducts();
        } else {
            getLastCreatedProduct(products);
        }
    }, [products])

    useEffect(() => {
        if (!isUsersLoading && !isLastCreatedUserLoading && !isProductsLoading && !isLastCreatedProductLoading) {
            setIsAllLoading(false)
        }
    }, [isUsersLoading, isLastCreatedUserLoading, isProductsLoading, isLastCreatedProductLoading])

    console.log(users)
    console.log(products)
    console.log(lastCreatedUser)
    console.log(lastCreatedProduct)
    console.log(`IsUsersLoading : ${isUsersLoading}`)
    console.log(`IsProductsLoading : ${isProductsLoading}`)
    console.log(`IsLastCreatedUserLoading : ${isLastCreatedUserLoading}`)
    console.log(`IsLastCreatedProductLoading : ${isLastCreatedProductLoading}`)
    console.log(`isAllLoading : ${isAllLoading}`)

    return (
        <>
            <MainNavbar />
            <Container>
                {isAllLoading ?
                    <>
                        <Container>
                            <Row className="justify-content-center align-items-center">
                                <h3>Loading...</h3>
                                <Spinner animation="border" variant="primary" />
                            </Row>
                        </Container>
                    </>
                    :
                    <>
                        <Row className="m-2">
                            <Col><DataCard cardTitle="Usuarios" displayedNumber={users.count} /></Col>
                            <Col><DataCard cardTitle="Productos" displayedNumber={products.count} /></Col>
                            <Col><DataCard cardTitle="Categorias" displayedNumber={Object.keys(products.countByCategory).length} /></Col>
                        </Row>
                        <Row className="justify-content-center m-2">
                            <Col>
                                <LastCreatedCard
                                    cardCategory="usuario"
                                    cardContent={{
                                        row1: `ID: ${lastCreatedUser.id}`,
                                        row2: `Nombre: ${lastCreatedUser.first_name} ${lastCreatedUser.last_name}`,
                                        row3: `Email: ${lastCreatedUser.email}`,
                                        row4: `Fecha de creacion: ${lastCreatedUser.createdAt}`,
                                        row5: `Fecha de ultima modificacion: ${lastCreatedUser.updatedAt}`
                                    }}
                                    cardImage={lastCreatedUser.image}
                                />
                            </Col>
                        </Row>
                        <Row className="justify-content-center m-2">
                            <Col>
                                <LastCreatedCard
                                    cardCategory="producto"
                                    cardContent={{
                                        row1: `ID: ${lastCreatedProduct.product.id}`,
                                        row2: `Marca: ${lastCreatedProduct.product.brand.name}`,
                                        row3: `Modelo: ${lastCreatedProduct.product.name}`,
                                        row4: `Precio: ${lastCreatedProduct.product.price_final}`,
                                        row5: `Fecha de creacion: ${lastCreatedProduct.product.createdAt}`,
                                        row6: `Fecha de ultima modificacion: ${lastCreatedProduct.product.updatedAt}`
                                    }}
                                    cardImage={`http://localhost:3000/img/products/${lastCreatedProduct.product.main_picture}`}
                                />
                            </Col>
                        </Row>
                    </>
                }
            </Container>
        </>
    )
}

export default DashboardPage