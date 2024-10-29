import { Field, Form, Formik } from "formik";
import { IoSearch } from "react-icons/io5";
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSearch: (searchQuery: string) => void;
}

interface FormValues {
    search: string
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const handleSubmit = (values: FormValues, { resetForm }: { resetForm: () => void }) => {
        const searchQuery = values.search.trim();
        
        if (!searchQuery) {
            onSearch('');
            return;
        }
        onSearch(searchQuery);
        resetForm();
    };

    return (
        <header className={styles.formWrapper}>
            <Formik onSubmit={handleSubmit} initialValues={{ search: '' }}>
                <Form className={styles.form}>
                    <button type="submit" className={styles.searchButton}>
                        <IoSearch size="16"/>
                        Search
                    </button>
                    <Field
                        name="search"
                        type="search"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        className={styles.searchField}
                        aria-label="Search images and photos"
                    />
                </Form>
            </Formik>
        </header>
    );
};