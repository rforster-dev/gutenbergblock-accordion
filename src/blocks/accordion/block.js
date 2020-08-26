/**
 * BLOCK: Accordion
 *
 */

//  Import CSS.
import "./style.scss";
import "./editor.scss";
const __ = wp.i18n.__; 
const registerBlockType = wp.blocks.registerBlockType;
const { RichText, PlainText } = wp.editor;

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("rf-blocks-library/accordion", {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __("Accordion"), // Block title.
    icon: "format-quote", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
    keywords: [__("Accordion"), __("rf")],

    attributes: {
        id: {
            source: "attribute",
            selector: "div.accordion-container",
            attribute: "id",
        },
        accordions: {
            source: "query",
            default: [],
            selector: ".accordion",
            query: {

                index: {
                    source: "text",
                    selector: "span.accordion-index",
                },
                content: {
                    source: "text",
                    selector: "div.accordion-panel div",
                },
                title: {
                    source: "text",
                    selector: "span.accordion-title",
                },
            },
        },
    },

    /**
     * The edit function describes the structure of your block in the context of the editor.
     * This represents what the editor will render when the block is used.
     *
     * The "edit" property must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */

    // The "edit" property must be a valid function.
    edit: (props) => {
        const { accordions } = props.attributes;

        if (!props.attributes.id) {
            const id = `accordion${Math.floor(Math.random() * 100)}`;
            props.setAttributes({
                id,
            });
        }

        const accordionsList = accordions
            .sort((a, b) => a.index - b.index)
            .map((accordion) => {
                return (
                    <div className="accordion">
                        <div className="accordion-item">
                            {/* <label>Content:</label> */}
                            <div className="accordion__heading">
                                <button
                                    aria-expanded="false"
                                    class="accordion-trigger"
                                    aria-controls={"sect" + accordion.index}
                                    id={"accordion" + accordion.index + "id"}>

                                    <PlainText
                                        className="title-plain-text"
                                        placeholder="Accordion title..."
                                        value={accordion.title}
                                        onChange={(title) => {
                                            const newObject = Object.assign({}, accordion, {
                                                title: title,
                                            });
                                            props.setAttributes({
                                                accordions: [
                                                    ...accordions.filter(
                                                        (item) => item.index != accordion.index
                                                    ),
                                                    newObject,
                                                ],
                                            });
                                        }}
                                    />
                                    <span class="accordion-icon"></span>

                                </button>
                            </div>
                            <div id={"sect" + accordion.index}
                                role="region"
                                aria-labelledby={"accordion" + accordion.index + "id"}
                                class="accordion-panel">
                                <RichText
                                    className="content-plain-text"
                                    style={{ height: 58 }}
                                    placeholder="Accordion content..."
                                    value={accordion.content}
                                    autoFocus
                                    onChange={(content) => {
                                        const newObject = Object.assign({}, accordion, {
                                            content: content,
                                        });
                                        props.setAttributes({
                                            accordions: [
                                                ...accordions.filter(
                                                    (item) => item.index != accordion.index
                                                ),
                                                newObject,
                                            ],
                                        });
                                    }}
                                />
                            </div>

                        </div>
                        <div class="rf-blocks-library--button-container--inner">
                            <button
                                className="remove-accordion"
                                onClick={() => {
                                    const newaccordions = accordions
                                        .filter((item) => item.index != accordion.index)
                                        .map((t) => {
                                            if (t.index > accordion.index) {
                                                t.index -= 1;
                                            }

                                            return t;
                                        });

                                    props.setAttributes({
                                        accordions: newaccordions,
                                    });
                                }}
                            >
                                <span class="dashicons dashicons-remove"></span>Remove accordion
                            </button>
                        </div>
                    </div>
                );
            });
        return (
            <div className={props.className}>
                {accordionsList}
                <div class="rf-blocks-library--button-container">
                    <button
                        className="add-more-accordion"
                        onClick={(content) =>
                            props.setAttributes({
                                accordions: [
                                    ...props.attributes.accordions,
                                    {
                                        index: props.attributes.accordions.length,
                                        content: "",
                                        title: "",
                                    },
                                ],
                            })
                        }
                    >
                        <span class="dashicons dashicons-insert"></span> Add accordion
                    </button>
                </div>
            </div>
        );
    },

    /**
     * The save function defines the way in which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    save: (props) => {
        const { id, accordions } = props.attributes;

        const accordionsList = accordions.map(function (accordion) {
            return (
                <div className="accordion">
                    <span className="accordion-index" style={{ display: "none" }}>
                        {accordion.index}
                    </span>
                    <div class="accordion__heading">
                        <button aria-expanded="false" class="accordion-trigger"
                            aria-controls={"sect" + id + accordion.index}
                            id={"accordion" + id + accordion.index + "id"}>
                            {accordion.title && (
                                <span class="accordion-title accordion__title">
                                    {accordion.title}
                                    <span class="accordion-icon"></span>
                                </span>
                            )}
                        </button>
                    </div>
                    {accordion.content && (
                        <div id={"sect" + id + accordion.index}
                            role="region"
                            aria-labelledby={"accordion" + id + accordion.index + "id"}
                            class="accordion-panel"
                            hidden="">
                            <div>
                                {accordion.content}
                            </div>
                        </div>
                    )}
                </div>
            );
        });
        if (accordions.length > 0) {
            return (
                <div className="accordion-container" id={id} data-allow-toggle data-allow-multiple>
                    {accordionsList}
                </div>

            );
        } else return null;
    },
});