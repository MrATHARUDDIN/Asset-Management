const Heading = ({title}) => {
    return (
        <div>
            <hr className="bg-orange-400 h-1 mb-3" />
            <h1 className="text-4xl font-bold text-center">{title}</h1>
            <hr className="bg-orange-400 h-1 mt-3"/>
        </div>
    );
};

export default Heading;