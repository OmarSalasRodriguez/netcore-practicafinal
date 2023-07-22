
import { Card, CardTitle, CardText, ListGroup, ListGroupItem, CardBody, CardLink, CardFooter, Button, CardHeader, Badge } from "reactstrap";


const PersonaCard = ({ personaItems, deletePersonaItem, setEdit, showModal, setShowModal }) => {

    const sendData = (contacto) => {
        setEdit(contacto);
        setShowModal(!showModal);
    };

    const data = (
        personaItems.map((item) => (

            <Card
               key={item.Id}
              style={{
                  
                  'gridColumn': 'span 4 / span 4',
                  'borderRadius': '10px',
                  'overflow': 'hidden'
              }}
            >
              <img
                alt="Card"
                src="https://picsum.photos/300/200"
              />
              <CardBody>
                <CardTitle tag="h5">
                        { item.Name }
                </CardTitle>
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>
                        { item.Description }
                    </ListGroupItem>
                    <ListGroupItem>
                        <Badge color={item.IsCompleted ? 'success' : 'primary' }>
                            { item.IsCompleted ? 'Completado' : 'En proceso' }
                        </Badge>
                    </ListGroupItem>
                </ListGroup>
                <CardFooter style={{'display': 'flex'}}>
                    <Button color="primary" size="sm" className="me-2" style={{'flex': 1}} onClick={() => sendData(item)}>Editar</Button>
                    <Button color="danger" size="sm" className="me-2" style={{ 'flex': 1 }} onClick={() => deletePersonaItem(item.Id)}>Eliminar</Button>
                </CardFooter>
            </Card>


            
        ))
    );


    return (<>
        <div style={{ 'display': 'grid', 'gap': '25px', 'gridTemplateColumns': 'repeat(12, minmax(0, 1fr))' }}>
            {data}
        </div>
        
    </>);
}

export default PersonaCard;